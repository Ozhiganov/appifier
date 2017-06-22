/* global shellInfo */
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home';
import MoreVertIcon from 'material-ui-icons/MoreVert';

import Tabs from './Tabs';
import WebView from './WebView';

const styleSheet = createStyleSheet('App', theme => ({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
  },
  leftNav: {
    backgroundColor: theme.palette.background.default,
    flexBasis: 80,
    width: 80,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: process.env.PLATFORM === 'darwin' ? theme.spacing.unit * 5 : theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    boxSizing: 'border-box',
    WebkitUserSelect: 'none',
    WebkitAppRegion: 'drag',
  },
  webNavContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  webNavIconButtonRoot: {
    height: 28,
    width: 28,
  },
  webNavIconButtonIcon: {
    height: 20,
    width: 20,
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    height: '100%',
    width: '100%',
  },
}));

const App = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.leftNav}>
        <Tabs />
        <div className={classes.webNavContainer}>
          <IconButton aria-label="Home" className={classes.webNavIconButtonRoot}>
            <HomeIcon className={classes.webNavIconButtonIcon} />
          </IconButton>
          <IconButton aria-label="More" className={classes.webNavIconButtonRoot}>
            <MoreVertIcon className={classes.webNavIconButtonIcon} />
          </IconButton>
        </div>
      </div>
      <WebView
        parentClassName={classes.webviewContainer}
        className={classes.webview}
        plugins
        allowpopups
        autoresize
        src={shellInfo.url}
      />
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(App);
