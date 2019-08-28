import React, { Component, Fragment } from 'react';
import MeetingListItem from './MeetingListItem';
import InfiniteScroll from 'react-infinite-scroller';

class MeetingList extends Component {
  render() {
    const { meetings, getNextMeetings, loading, moreMeetings } = this.props;
    return (
      <Fragment>
        {meetings && meetings.length !== 0 && (
          <InfiniteScroll pageStart={0} loadMore={getNextMeetings} hasMore={!loading && moreMeetings} initialLoad={false} >
            {meetings &&
              meetings.map(meeting => (
                <MeetingListItem key={meeting.id} meeting={meeting} />
              ))}
          </InfiniteScroll>
        )}
      </Fragment>
    );
  }
}

export default MeetingList;
