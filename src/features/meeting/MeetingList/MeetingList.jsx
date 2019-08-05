import React, { Component, Fragment } from "react";
import MeetingListItem from "./MeetingListItem";

class MeetingList extends Component {
  render() {
    const { meetings, selectedMeeting, deleteMeeting } = this.props;
    return (
      <Fragment>
        {meetings.map(meeting => (
          <MeetingListItem
            key={meeting.id}
            meeting={meeting}
            selectedMeeting={selectedMeeting}
            deleteMeeting={deleteMeeting}
          />
        ))}
      </Fragment>
    );
  }
}

export default MeetingList;
