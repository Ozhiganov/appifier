import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Fade from 'material-ui/transitions/Fade';
import Slide from 'material-ui/transitions/Slide';
import { LinearProgress } from 'material-ui/Progress';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';
import Dialog, {
  DialogActions,
  DialogContent,
} from 'material-ui/Dialog';

import connectComponent from '../utils/connect-component';

import RequireLogIn from '../shared/require-log-in';

import {
  close,
  formUpdate,
  save,
} from '../state/dialogs/submit-app/actions';

import {
  STRING_SUBMIT_APP,
  STRING_APP_NAME,
  STRING_APP_URL,
  STRING_APP_NAME_PLACEHOLDER,
  STRING_APP_URL_PLACEHOLDER,
  STRING_CANCEL,
  STRING_SUBMIT,
  STRING_SUBMITTING,
} from '../constants/strings';

import EnhancedDialogTitle from '../shared/enhanced-dialog-title';

const styleSheet = {
  linearProgress: {
    opacity: 0,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  dialogContent: {
    minWidth: 320,
  },
  formControl: {
    width: '100%',
  },
};


const SubmitApp = (props) => {
  const {
    isLoggedIn,
    isSaving,
    classes,
    name,
    nameError,
    onSave,
    onClose,
    onFormUpdate,
    open,
    url,
    urlError,
  } = props;

  const saveButtonText = isSaving ? STRING_SUBMITTING : STRING_SUBMIT;

  return (
    <Dialog
      ignoreBackdropClick={isSaving}
      className={classes.root}
      onRequestClose={onClose}
      open={open}
      transition={<Slide direction="left" />}
    >
      <Fade in={isSaving}>
        <LinearProgress className={classes.linearProgress} />
      </Fade>

      <EnhancedDialogTitle onCloseButtonClick={onClose}>
        {STRING_SUBMIT_APP}
      </EnhancedDialogTitle>
      {!isLoggedIn ? (
        <DialogContent className={classes.dialogContent}>
          <RequireLogIn />
        </DialogContent>
      ) : [
        <DialogContent className={classes.dialogContent} key="content">
          <FormControl className={classes.formControl} error={nameError}>
            <InputLabel htmlFor="name">{STRING_APP_NAME}</InputLabel>
            <Input
              placeholder={STRING_APP_NAME_PLACEHOLDER}
              id="name"
              value={name}
              onChange={e => onFormUpdate({ name: e.target.value })}
            />
            {nameError ? <FormHelperText>{nameError}</FormHelperText> : null}
          </FormControl>
          <br />
          <br />
          <FormControl className={classes.formControl} error={urlError}>
            <InputLabel htmlFor="url">{STRING_APP_URL}</InputLabel>
            <Input
              placeholder={STRING_APP_URL_PLACEHOLDER}
              id="url"
              value={url}
              onChange={e => onFormUpdate({ url: e.target.value })}
            />
            {urlError ? <FormHelperText>{urlError}</FormHelperText> : null}
          </FormControl>
        </DialogContent>,
        <DialogActions key="actions">
          <Button
            color="primary"
            onClick={onClose}
          >
            {STRING_CANCEL}
          </Button>
          <Button
            disabled={isSaving}
            color="primary"
            onClick={onSave}
          >
            {saveButtonText}
          </Button>
        </DialogActions>,
      ]}
    </Dialog>
  );
};

SubmitApp.defaultProps = {
  name: '',
  nameError: null,
  open: false,
  url: '',
  urlError: null,
};

SubmitApp.propTypes = {
  classes: PropTypes.object.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  name: PropTypes.string,
  nameError: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onFormUpdate: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  url: PropTypes.string,
  urlError: PropTypes.string,
};

const mapStateToProps = state => ({
  isLoggedIn: Boolean(state.auth.token && state.auth.token !== 'anonymous'),
  isSaving: state.dialogs.submitApp.isSaving,
  name: state.dialogs.submitApp.form.name,
  nameError: state.dialogs.submitApp.form.nameError,
  open: state.dialogs.submitApp.open,
  url: state.dialogs.submitApp.form.url,
  urlError: state.dialogs.submitApp.form.urlError,
});

const actionCreators = {
  close,
  formUpdate,
  save,
};

export default connectComponent(
  SubmitApp,
  mapStateToProps,
  actionCreators,
  styleSheet,
);
