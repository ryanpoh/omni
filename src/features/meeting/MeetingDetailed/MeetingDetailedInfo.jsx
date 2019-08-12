import React from "react";
import { Segment, Grid, Icon, Button } from "semantic-ui-react";

const MeetingDetailedInfo = ({meeting}) => {
  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon name='info' size='large' color='teal'  />
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
            <span>{meeting.date}</span>
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
            <Button color='teal' size='tiny' content='Show Map' />
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default MeetingDetailedInfo;
