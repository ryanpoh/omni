import React, { Component, Fragment } from "react";
import EventListItem from "./EventListItem";

class EventList extends Component {
  render() {
    return (
      <Fragment>
        {this.props.meetings.map(meeting => (
          <EventListItem key={meeting.id} meeting={meeting} />
        ))}
      </Fragment>
    );
  }
}

export default EventList;
