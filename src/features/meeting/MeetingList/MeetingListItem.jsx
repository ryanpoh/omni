import React, { Component } from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import MeetingListAttendee from './MeetingListAttendee';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns'; //curly braces are functions. non-curly are classes. data fns doesnt recognize ISO date format

class MeetingListItem extends Component {
  render() {
    const { meeting, deleteMeeting } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src={meeting.chairPhotoURL} />
              <Item.Content>
                <Item.Header as='a'>{meeting.title}</Item.Header>
                <Item.Description>
                  Chaired by {meeting.chairedBy}
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name='clock' /> {format(parseISO(meeting.date), 'EEEE do LLL')} at{' '} 
            {format(parseISO(meeting.date), 'h:mm a')} |
            <Icon name='marker' /> {meeting.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {meeting.attendees &&
              meeting.attendees.map(attendee => (
                <MeetingListAttendee key={attendee.id} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{meeting.description}</span>

          <Button
            onClick={() => deleteMeeting(meeting)}
            as='a'
            color='red'
            floated='right'
            content='Delete'
          />
          <Button
            as={Link}
            to={`/meetings/${meeting.id}`}
            color='teal'
            floated='right'
            content='View'
          />
        </Segment>
      </Segment.Group>
    );
  }
}

// passes meeting into selectedMeeting function
// onClick evt ordering is important

export default MeetingListItem;
