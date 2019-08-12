import React from "react";
import {connect} from 'react-redux'
import { Grid } from "semantic-ui-react";
import MeetingDetailedHeader from "./MeetingDetailedHeader";
import MeetingDetailedInfo from "./MeetingDetailedInfo";
import MeetingDetailedChat from "./MeetingDetailedChat";
import MeetingDetailedSidebar from "./MeetingDetailedSidebar";

const mapState = (state, ownProps) => {
 const meetingId = ownProps.match.params.id;
 let meeting ={};

 if(meetingId && state.meetings.length > 0){
   meeting = state.meetings.filter(meeting => meeting.id === meetingId)[0]; //returns an array so we still need to specify with [0]
  }
  return {
    meeting
  }
}
const MeetingDetailedPage = ({meeting}) => {
  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <MeetingDetailedHeader meeting={meeting} />
          <MeetingDetailedInfo meeting={meeting}/>
          <MeetingDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <MeetingDetailedSidebar attendees={meeting.attendees} />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default connect(mapState)(MeetingDetailedPage);
