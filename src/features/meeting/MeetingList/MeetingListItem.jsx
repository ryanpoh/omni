import React, { Component } from "react";
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";
import MeetingListAttendee from "./MeetingListAttendee";

class MeetingListItem extends Component {
  render() {
    const { meeting } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src={meeting.chairPhotoURL} />
              <Item.Content>
                <Item.Header as='a'>{meeting.title}</Item.Header>
                <Item.Description>
                  Chaired by <a>{meeting.chairedBy}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name='clock' /> {meeting.date} |
            <Icon name='marker' /> {meeting.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {meeting.attendees && meeting.attendees.map(attendee => (
              <MeetingListAttendee key={attendee.id} attendee={attendee} />
            ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{meeting.description}</span>
          <Button as='a' color='teal' floated='right' content='View' />
        </Segment>
      </Segment.Group>
    );
  }
}

export default MeetingListItem;
