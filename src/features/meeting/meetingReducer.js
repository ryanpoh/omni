import { createReducer } from "../../app/common/util/reducerUtils";
import {
  UPDATE_MEETING,
  DELETE_MEETING,
  CREATE_MEETING,
  FETCH_MEETINGS,
  FETCH_USER_MEETINGS
} from "./meetingConstants";

 const initialState = [{
   meetings: [],
   userMeetings: []
 }];

const createMeeting = (state, payload) => {
  return [...state, payload.meeting];
};

const updateMeeting = (state, payload) => {
  return [
    ...state.filter(meeting => meeting.id !== payload.meeting.id),
    payload.meeting
  ];
};

const deleteMeeting = (state, payload) => {
  return [...state.filter(meeting => meeting.id !== payload.meetingId)];
};

const fetchMeetings = (state, payload) => {
  return {
    ...state, //copy current state
    meetings: payload.meetings
  }
}

const fetchUserMeetings = (state, payload) => {
  return {
    ...state,
    userMeetings: payload.meetings
  }
}

export default createReducer(initialState, { //links actions in xxxActions.js to reducer functions here
  [CREATE_MEETING]: createMeeting,
  [UPDATE_MEETING]: updateMeeting,
  [DELETE_MEETING]: deleteMeeting,
  [FETCH_MEETINGS]: fetchMeetings,
  [FETCH_USER_MEETINGS]: fetchUserMeetings
});
