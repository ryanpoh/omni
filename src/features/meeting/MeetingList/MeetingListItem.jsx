import React, { Component } from 'react';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import MeetingListAttendee from './MeetingListAttendee';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'; //curly braces are functions. non-curly are classes. data fns doesnt recognize ISO date format
import { connect } from 'react-redux';


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
                  Chaired by {meeting.chairedBy}
                </Item.Description>
                {meeting.cancelled && (
                  <Label
                    style={{ top: '-40px' }}
                    ribbon='right'
                    color='red'
                    content='This meeting has been cancelled'
                  />
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name='clock' />
            {format(meeting.date.toDate(), 'EEEE do LLL')} at{' '}
            {format(meeting.date.toDate(), 'h:mm a')} |
            <Icon name='marker' /> {meeting.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {meeting.attendees &&
              Object.values(meeting.attendees).map((attendee, index) => (
                <MeetingListAttendee key={index} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{meeting.description}</span>

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

export default connect(
  null,
)(MeetingListItem);
