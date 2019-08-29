import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import UserDetailedSidebar from './UserDetailedSidebar';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedMeetings from './UserDetailedMeetings';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDescription from './UserDetailedDescription';
import { compose } from 'redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { userDetailedQuery } from '../userQueries';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { getUserMeetings } from '../userActions';

const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }
  return {
    auth: state.firebase.auth, //auth needed to query for photos
    profile,
    meetings: state.meetings.userMeetings,
    meetingsLoading: state.async.loading,
    photos: state.firestore.ordered.photos,
    userUid,
    requesting: state.firestore.status.requesting
  };
};

const actions = {
  getUserMeetings
};

class UserDetailedPage extends Component {
  async componentDidMount() {
    await this.props.getUserMeetings(this.props.userUid);
  }

  changeTab = (e, data) => {
    this.props.getUserMeetings(this.props.userUid, data.activeIndex);
  };

  render() {
    const {
      profile,
      photos,
      auth,
      match,
      requesting,
      meetings,
      meetingsLoading
    } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);
    if (loading) return <LoadingComponent />;
    return (
      <Grid>
        <UserDetailedHeader profile={profile} />
        <UserDetailedDescription profile={profile} />
        <UserDetailedSidebar isCurrentUser={isCurrentUser} />
        {photos && photos.length > 0 && <UserDetailedPhotos photos={photos} />}
        <UserDetailedMeetings
          meetings={meetings}
          meetingsLoading={meetingsLoading}
          changeTab={this.changeTab}
        />
      </Grid>
    );
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid)) // uses the query we delclared earlier to pull down/listen the photo subcollection
)(UserDetailedPage);
