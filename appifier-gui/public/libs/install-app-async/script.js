const { https } = require('follow-redirects');
const argv = require('yargs-parser')(process.argv.slice(1));
const appifier = require('appifier');
const fs = require('fs-extra');
const isUrl = require('is-url');
const path = require('path');

const {
  allAppPath,
  homePath,
  icon,
  id,
  name,
  tempPath,
  url,
} = argv;

const iconDirPath = path.join(homePath, '.appifier', 'icons');

const downloadFileTempAsync = (filePath) => {
  const iconFileName = `appifier-${id}.png`;
  const iconPath = path.join(tempPath, iconFileName);

  if (isUrl(filePath)) {
    return new Promise((resolve, reject) => {
      const iconFile = fs.createWriteStream(iconPath);

      const req = https.get(filePath, (response) => {
        response.pipe(iconFile);

        iconFile.on('error', (err) => {
          reject(err);
        });

        iconFile.on('finish', () => {
          resolve(iconPath);
        });
      });

      req.on('error', (err) => {
        reject(err);
      });
    });
  }

  return fs.copy(filePath, iconPath)
    .then(() => iconPath);
};

downloadFileTempAsync(icon)
  .then(iconPath =>
    appifier.createAppAsync(
      id,
      name,
      url,
      iconPath,
      tempPath,
    )
      .then((appPath) => {
        const originPath = (process.platform === 'darwin') ?
          path.join(appPath, `${name}.app`) : appPath;

        const originPathParsedObj = path.parse(originPath);

        const destPath = path.join(
          allAppPath,
          `${originPathParsedObj.name}${originPathParsedObj.ext}`,
        );

        return fs.move(originPath, destPath)
          .then(() => destPath);
      })
      .then(() => fs.copy(iconPath, path.join(iconDirPath, `${id}.png`)))
      .then(() => {
        process.exit(0);
      }))
  .catch((e) => {
    process.send(JSON.stringify({
      message: e.message,
      stack: e.stack,
    }));
    process.exit(1);
  });

process.on('uncaughtException', (e) => {
  process.send(JSON.stringify({
    message: e.message,
    stack: e.stack,
  }));
  process.exit(1);
});
