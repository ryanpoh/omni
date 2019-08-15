import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import MeetingList from "../MeetingList/MeetingList";
import { createMeeting, updateMeeting, deleteMeeting } from "../meetingActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import MeetingActivity from "../MeetingActivity/MeetingActivity";

const mapState = state => ({
  meetings: state.meetings,
  loading: state.async.loading
});

const actions = {
  createMeeting,
  deleteMeeting,
  updateMeeting
};

class MeetingDashboard extends Component {


  handleDeleteMeeting = id => {
    this.props.deleteMeeting(id);
  };

  render() {
    const { meetings, loading } = this.props;
    if (loading) return <LoadingComponent /> // inverted= {false} will a darker loading screen
    return (
      <Grid>
        <Grid.Column width={10}>
          <MeetingList
            deleteMeeting={this.handleDeleteMeeting}
            meetings={meetings}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <MeetingActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(MeetingDashboard);
