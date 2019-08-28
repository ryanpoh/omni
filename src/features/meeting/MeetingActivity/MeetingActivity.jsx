import React from 'react';
import { Header, Segment, Feed, Sticky } from 'semantic-ui-react';
import MeetingActivityItem from './MeetingActivityItem';

//Fragment is needed because we can only pass in 1 element. so we need to wrap up our adjacent elements
//zIndex is so that user settings will overlap activities feed
const MeetingActivity = ({ activities, contextRef }) => {
  return (
    <Sticky context={contextRef} offset={100} styleElement={{zIndex: 0}} >
      <Header attached='top' content='Recent Activity' />
      <Segment attached>
        <Feed>
          {activities &&
            activities.map(activity => (
              <MeetingActivityItem key={activity.id} activity={activity} />
            ))}
        </Feed>
      </Segment>
    </Sticky>
  );
};

export default MeetingActivity;
