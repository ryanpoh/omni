import React from 'react';
import {
  Card,
  Image,
  Segment,
  Header,
  Grid,
  Tab
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

const panes = [
  { menuItem: 'All Meetings', pane: { key: 'allMeetings' } },
  { menuItem: 'Past Meetings', pane: { key: 'pastMeetings' } },
  { menuItem: 'Future Meetings', pane: { key: 'futureMeetings' } },
  { menuItem: 'Chaired Meetings', pane: { key: 'chaired' } }
];

const UserDetailedMeetings = ({ meetings, meetingsLoading, changeTab }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached loading={meetingsLoading}>
        <Header icon='calendar' content='Events' />
        <Tab  onTabChange={(e, data) => changeTab(e, data) } panes={panes} menu={{ secondary: true, pointing: true }} />
        <br/>

        <Card.Group itemsPerRow={5}>
          {meetings &&
            meetings.map(meeting => (
              <Card as={Link} to={`/meetings/${meeting.id}`} key={meeting.id}>
                <Image src={`/assets/categoryImages/${meeting.category}.jpg`} />
                <Card.Content>
                  <Card.Header textAlign='center'>{meeting.title}</Card.Header>
                  <Card.Meta textAlign='center'>
                    <div>
                      {format(
                        meeting.date && meeting.date.toDate(),
                        'dd MM yyyy'
                      )}
                    </div>
                    <div>
                      {format(meeting.date && meeting.date.toDate(), 'h:mm aa')}
                    </div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedMeetings;
