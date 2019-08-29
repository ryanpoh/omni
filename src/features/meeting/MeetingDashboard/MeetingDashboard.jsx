import React, { Component, createRef } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import MeetingList from '../MeetingList/MeetingList';
import { getMeetingsForDashboard } from '../meetingActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import MeetingActivity from '../MeetingActivity/MeetingActivity';
import { firestoreConnect } from 'react-redux-firebase';

const query = [
  {
    collection: 'activity',
    orderBy: ['timestamp', 'desc'],
    limit: 5
  }
];

const mapState = state => ({
  meetings: state.meetings.meetings, //s25_e235 to integrate seperate fetch meeting for user
  loading: state.async.loading,
  activities: state.firestore.ordered.activity
});

const actions = {
  getMeetingsForDashboard
};

class MeetingDashboard extends Component {
  contextRef = createRef();

  state = {
    moreMeetings: false,
    loadingInitial: true,
    loadedMeetings: []
  };

  async componentDidMount() {
    let next = await this.props.getMeetingsForDashboard();

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreMeetings: true,
        loadingInitial: false
      });
    }
  }

  componentDidUpdate = prevProps => {
    if (this.props.meetings !== prevProps.meetings) {
      this.setState({
        loadedMeetings: [...this.state.loadedMeetings, ...this.props.meetings]
      });
    }
  };

  getNextMeetings = async () => {
    const { meetings } = this.props;
    let lastMeeting = meetings && meetings[meetings.length - 1];
    let next = await this.props.getMeetingsForDashboard(lastMeeting);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreMeetings: false
      });
    }
  };

  render() {
    const { loading, activities } = this.props;
    const { moreMeetings, loadedMeetings } = this.state;
    if (this.state.loadingInitial) return <LoadingComponent />; // inverted= {false} will a darker loading screen
    return (
      <Grid>
        <Grid.Column width={10}>
          <div ref={this.contextRef}>
            <MeetingList
              loading={loading}
              meetings={loadedMeetings}
              moreMeetings={moreMeetings}
              getNextMeetings={this.getNextMeetings}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <MeetingActivity
            activities={activities}
            contextRef={this.contextRef}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect(query)(MeetingDashboard));
