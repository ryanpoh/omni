import React, { Fragment } from 'react';
import { Segment, Image, Item, Header, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const meetingImageStyle = {
  filter: 'brightness(30%)'
};

const meetingImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const MeetingDetailedHeader = ({
  meeting,
  isChair,
  isGoing,
  goingToMeeting,
  cancelGoingToMeeting,
  loading
}) => {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${meeting.category}.jpg`}
          fluid
          style={meetingImageStyle}
        />

        <Segment basic style={meetingImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={meeting.title}
                  style={{ color: 'white' }}
                />
                <p>
                  {meeting.date &&
                    format(meeting.date.toDate(), 'EEEE do LLLL')}
                </p>
                <p>
                  Chaired by{' '}
                  <strong>
                    <Link
                      to={`/profile/${meeting.chairUid}`}
                      style={{ color: 'white' }}
                    >
                      {meeting.chairedBy}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached='bottom' clearing>
        {meeting.cancelled && (
          <Label
            size='large'
            color='red'
            content='The meeting has been cancelled'
          />
        )}
        {!isChair && (
          <Fragment>
            {isGoing && !meeting.cancelled && (
              <Button onClick={() => cancelGoingToMeeting(meeting)}>
                Cancel My Attendance
              </Button>
            )}
            {!isGoing && !meeting.cancelled && (
              <Button
                loading={loading}
                onClick={() => goingToMeeting(meeting)}
                color='teal'
              >
                JOIN THIS MEETING
              </Button>
            )}
          </Fragment>
        )}

        {isChair && (
          <Button
            as={Link}
            to={`/manage/${meeting.id}`}
            color='orange'
            floated='right'
          >
            Manage Meeting
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default MeetingDetailedHeader;
