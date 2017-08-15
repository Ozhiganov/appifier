import React from 'react';
import PropTypes from 'prop-types';

import { LinearProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import Fade from 'material-ui/transitions/Fade';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import connectComponent from '../utils/connect-component';

import {
  close,
  save,
} from '../state/dialogs/confirm-uninstall-app/actions';

import {
  STRING_BROWSING_DATA_REMOVED,
  STRING_CANCEL,
  STRING_UNINSTALL,
  STRING_UNINSTALLING_APP_NAME,
  STRING_UNINSTALLING,
} from '../constants/strings';

const styleSheet = {
  linearProgress: {
    opacity: 0,
  },
  dialogContent: {
    maxWidth: 288,
  },
  title: {
    marginRight: 24,
  },
};

const ConfirmUninstallApp = (props) => {
  const {
    app,
    isSaving,
    classes,
    onSave,
    onClose,
    open,
  } = props;

  const saveButtonText = isSaving ? STRING_UNINSTALLING : STRING_UNINSTALL;

  return (
    <Dialog
      ignoreBackdropClick={isSaving}
      className={classes.root}
      onRequestClose={onClose}
      open={open}
      transition={Fade}
    >
      <Fade in={isSaving}>
        <LinearProgress className={classes.linearProgress} />
      </Fade>

      <DialogTitle className={classes.title}>{STRING_UNINSTALLING_APP_NAME.replace('{appName}', app.name)}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>
          {STRING_BROWSING_DATA_REMOVED.replace('{appName}', app.name)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={onClose}
        >
          {STRING_CANCEL}
        </Button>
        <Button
          color="accent"
          disabled={isSaving}
          onClick={onSave}
        >
          {saveButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmUninstallApp.defaultProps = {
  app: { name: '' },
  open: false,
};

ConfirmUninstallApp.propTypes = {
  classes: PropTypes.object.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  app: PropTypes.object,
};

const mapStateToProps = (state) => {
  const {
    isSaving,
    open,
    form,
  } = state.dialogs.confirmUninstallApp;

  const { app } = form;

  return {
    isSaving,
    open,
    app,
  };
};

const actionCreators = {
  close,
  save,
};

export default connectComponent(
  ConfirmUninstallApp,
  mapStateToProps,
  actionCreators,
  styleSheet,
);
