import React, { Component, Fragment } from "react";
import MeetingListItem from "./MeetingListItem";

class MeetingList extends Component {
  render() {
    const { meetings, deleteMeeting } = this.props;
    return (
      <Fragment>
        {meetings && meetings.map(meeting => (
          <MeetingListItem
            key={meeting.id}
            meeting={meeting}
            deleteMeeting={deleteMeeting}
          />
        ))}
      </Fragment>
    );
  }
}

export default MeetingList;
