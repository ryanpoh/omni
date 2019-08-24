import React, { useState } from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import MeetingDetailedMap from './MeetingDetailedMap';
import { format } from 'date-fns';

const MeetingDetailedInfo = ({ meeting }) => {
  const [isMapOpen, showMapToggle] = useState(false);
  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon name='info' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{meeting.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            {meeting.date && (
              <span>
                {format(meeting.date.toDate(), 'EEEE do LLL')} at{' '}
                {format(meeting.date.toDate(), 'h:mm a')}
              </span>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{meeting.venue}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              onClick={() => showMapToggle(!isMapOpen)}
              color='teal'
              size='tiny'
              content={isMapOpen ? 'Hide Map' : 'Show Map'}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {isMapOpen && (
        <MeetingDetailedMap
          lat={meeting.venueLatLng.lat}
          lng={meeting.venueLatLng.lng}
        />
      )}
    </Segment.Group>
  );
};

export default MeetingDetailedInfo;
