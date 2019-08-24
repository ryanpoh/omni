import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import MeetingDetailedHeader from './MeetingDetailedHeader';
import MeetingDetailedInfo from './MeetingDetailedInfo';
import MeetingDetailedChat from './MeetingDetailedChat';
import MeetingDetailedSidebar from './MeetingDetailedSidebar';
import { withFirestore } from 'react-redux-firebase';
import { objectToArray } from '../../../app/common/util/helpers';
import { goingToMeeting, cancelGoingToMeeting } from '../../user/userActions';

const mapState = (state, ownProps) => {
  const meetingId = ownProps.match.params.id;
  let meeting = {};

  if (
    state.firestore.ordered.meetings &&
    state.firestore.ordered.meetings.length > 0
  ) {
    meeting =
      state.firestore.ordered.meetings.filter(
        meeting => meeting.id === meetingId
      )[0] || {}; //returns an array so we still need to specify with [0]
  }
  return {
    meeting,
    auth: state.firebase.auth
  };
};

const actions = {
  goingToMeeting,
  cancelGoingToMeeting
};

class MeetingDetailedPage extends Component {
  // we used firestoreConnect higher order and also the query function to set up a listener. a listener will gives us access to live data. but in this case, firestore.get will just give us an instance of the document which is not live

  async componentDidMount() {
    // data will appear in redux state
    const { firestore, match } = this.props;
    await firestore.setListener(`meetings/${match.params.id}`); // using match to get event id from routing params
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`meetings/${match.params.id}`);
  }

  //convert this to class so that we can use the componentDidMount Lifecycle
  render() {
    // required component in any method
    const { meeting, auth, goingToMeeting, cancelGoingToMeeting } = this.props;
    const attendees =
      meeting && meeting.attendees && objectToArray(meeting.attendees);
    const isChair = meeting.chairUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    return (
      <div>
        <Grid>
          <Grid.Column width={10}>
            <MeetingDetailedHeader
              meeting={meeting}
              isGoing={isGoing}
              isChair={isChair}
              goingToMeeting={goingToMeeting}
              cancelGoingToMeeting={cancelGoingToMeeting}
            />
            <MeetingDetailedInfo meeting={meeting} />
            <MeetingDetailedChat />
          </Grid.Column>
          <Grid.Column width={6}>
            <MeetingDetailedSidebar attendees={attendees} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(MeetingDetailedPage)
);
