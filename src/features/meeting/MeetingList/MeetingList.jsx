import React, { Component, Fragment } from "react";
import MeetingListItem from "./MeetingListItem";

class MeetingList extends Component {
  render() {
    return (
      <Fragment>
        {this.props.meetings.map(meeting => (
          <MeetingListItem key={meeting.id} meeting={meeting} />
        ))}
      </Fragment>
    );
  }
}

export default MeetingList;
