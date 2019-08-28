import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import MeetingList from '../MeetingList/MeetingList';
import { getMeetingsForDashboard } from '../meetingActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import MeetingActivity from '../MeetingActivity/MeetingActivity';
import { firestoreConnect } from 'react-redux-firebase';

const mapState = state => ({
  meetings: state.meetings,
  loading: state.async.loading
});

const actions = {
  getMeetingsForDashboard
};

class MeetingDashboard extends Component {
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
    console.log(lastMeeting);
    let next = await this.props.getMeetingsForDashboard(lastMeeting);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreMeetings: false
      });
    }
  };

  render() {
    const { loading } = this.props;
    const { moreMeetings, loadedMeetings } = this.state;
    if (this.state.loadingInitial) return <LoadingComponent />; // inverted= {false} will a darker loading screen
    return (
      <Grid>
        <Grid.Column width={10}>
          <MeetingList
            loading={loading}
            meetings={loadedMeetings}
            moreMeetings={moreMeetings}
            getNextMeetings={this.getNextMeetings}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <MeetingActivity />
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
)(firestoreConnect([{ collection: 'meetings' }])(MeetingDashboard));
