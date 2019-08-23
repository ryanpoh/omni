import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import UserDetailedSidebar from './UserDetailedSidebar';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedMeetings from './UserDetailedMeetings';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDescription from './UserDetailedDescription';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const query = ({auth}) => { //allows us to bring back or listen to our photos subcolletion for that particular user (need uid)
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{collection: 'photos'}],
      storeAs: 'photos'
    }
  ]
}

const mapState = state => ({
  auth: state.firebase.auth, //auth needed to query for photos
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos
});

class UserDetailedPage extends Component {
  render() {
    const { profile, photos } = this.props;
    return (
      <Grid>
        <UserDetailedHeader profile={profile} />
        <UserDetailedDescription profile={profile} />
        <UserDetailedSidebar />
        {photos && photos.length > 0 && 
        <UserDetailedPhotos photos={photos}/>}
        <UserDetailedMeetings />
      </Grid>
    );
  }
}

export default compose(
connect(mapState),
firestoreConnect(auth => query(auth)), // uses the query we delclared earlier to pull down/listen the photo subcollection
)(UserDetailedPage);
