import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import MeetingList from "../MeetingList/MeetingList";
import { createMeeting, updateMeeting, deleteMeeting } from "../meetingActions";

const mapState = state => ({
  meetings: state.meetings
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
    const { meetings } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <MeetingList
            deleteMeeting={this.handleDeleteMeeting}
            meetings={meetings}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Activity Feed</h2>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(MeetingDashboard);
