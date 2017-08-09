import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LinearProgress } from 'material-ui/Progress';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import AppCard from '../shared/AppCard';
import DialogAccount from '../dialogs/Account';
import DialogAbout from '../dialogs/About';
import DialogSubmitApp from '../dialogs/SubmitApp';
import DialogConfirmUninstallApp from '../dialogs/ConfirmUninstallApp';
import DialogAppDetails from '../dialogs/AppDetails';
import DialogFeedback from '../dialogs/Feedback';
import { getUser } from '../../state/user/actions';
import { getUserApps } from '../../state/user/apps/actions';
import { getAppDetails } from '../../state/apps/details/actions';
import { getApps } from '../../state/apps/actions';

const styleSheet = createStyleSheet('Apps', () => ({
  grid: {
    marginBottom: 16,
  },
  scrollContainer: {
    flex: 1,
    padding: 36,
    overflow: 'auto',
    boxSizing: 'border-box',
  },
}));

class Apps extends React.Component {
  componentDidMount() {
    const {
      onGetApps,
      onGetUserApps,
      onGetUser,
    } = this.props;

    onGetUser();
    onGetUserApps();
    onGetApps();

    const el = this.scrollContainer;

    el.onscroll = () => {
      // Plus 300 to run ahead.
      if (el.scrollTop + 300 >= el.scrollHeight - el.offsetHeight) {
        onGetApps({ next: true });
      }
    };
  }

  render() {
    const {
      isGetting,
      classes,
      apps,
    } = this.props;

    return (
      <div
        className={classes.scrollContainer}
        ref={(container) => { this.scrollContainer = container; }}
      >
        <DialogAbout />
        <DialogSubmitApp />
        <DialogConfirmUninstallApp />
        <DialogAppDetails />
        <DialogAccount />
        <DialogFeedback />
        <Grid container className={classes.grid}>
          <Grid item xs={12}>
            <Grid container justify="center" gutter={24}>
              {apps.map(app => <AppCard key={app.id} app={app} />)}
            </Grid>
          </Grid>
        </Grid>
        {isGetting && (<LinearProgress />)}
      </div>
    );
  }
}

Apps.defaultProps = {
  category: null,
  sortBy: null,
};

Apps.propTypes = {
  classes: PropTypes.object.isRequired,
  isGetting: PropTypes.bool.isRequired,
  apps: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGetUserApps: PropTypes.func.isRequired,
  onGetApps: PropTypes.func.isRequired,
  onGetUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const apps = state.ui.search.open ? state.ui.search.results : state.apps.apiData.apps;
  const isGetting = state.ui.search.open ? state.ui.search.isGetting : state.apps.isGetting;

  return {
    isGetting,
    apps,
    category: state.apps.queryParams.category,
    sortBy: state.apps.queryParams.sortBy,
  };
};

const mapDispatchToProps = dispatch => ({
  onGetUser: () => dispatch(getUser()),
  onGetUserApps: () => dispatch(getUserApps()),
  onGetApps: optionsObject => dispatch(getApps(optionsObject)),
  onGetAppDetails: id => dispatch(getAppDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(Apps));
