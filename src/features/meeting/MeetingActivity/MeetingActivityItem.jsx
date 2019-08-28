import React, { Component } from 'react';
import { Feed } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {formatDistance} from 'date-fns';

class MeetingActivityItem extends Component {
  renderSummary = activity => {
    switch (activity.type) {
      case 'newMeeting':
        return (
          <div>
            New Meeting!{' '}
            <Feed.User
              as={Link}
              to={{ pathname: '/profile/' + activity.chairUid }}
            >
              {activity.chairedBy}
            </Feed.User>{' '}
            is chairing{' '}
            <Link to={{ pathname: '/meeting/' + activity.meetingId }}>
              {activity.title}
            </Link>
          </div>
        );
      case 'cancelledMeeting':
        return (
          <div>
            Meeting Cancelled!{' '}
            <Feed.User
              as={Link}
              to={{ pathname: '/profile/' + activity.chairUid }}
            >
              {activity.chairedBy}
            </Feed.User>{' '}
            has cancelled{' '}
            <Link to={{ pathname: '/event/' + activity.meetingId }}>
              {activity.title}
            </Link>
          </div>
        );
      default:
        return;
    }
  };

  render() {
    const { activity } = this.props;

    return (
      <Feed.Event>
        <Feed.Label>
          <img src={activity.photoURL || '/assets/user.png'} alt='' />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>{this.renderSummary(activity)}</Feed.Summary>
          <Feed.Meta>
            <Feed.Date>
              {formatDistance(activity.timestamp && activity.timestamp.toDate(), Date.now())} ago
            </Feed.Date>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

export default MeetingActivityItem;
