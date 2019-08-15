import {
  CREATE_MEETING,
  UPDATE_MEETING,
  DELETE_MEETING,
  FETCH_MEETINGS
} from './meetingConstants';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../async/asyncActions';
import { fetchSampleData } from '../../app/data/mockApi';
import { toastr } from 'react-redux-toastr';

export const createMeeting = meeting => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_MEETING,
        payload: {
          meeting
        }
      });
      toastr.success('Success!', 'Meeting has been created');
    } catch (error) {
      toastr.error('Oops', 'Something went wrong! :(');
    }
  };
};

export const updateMeeting = meeting => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_MEETING,
        payload: {
          meeting
        }
      });
      toastr.success('Success!', 'Meeting has been updated');
    } catch (error) {
      toastr.error('Oops', 'Something went wrong! :(');
    }
  };
};

export const deleteMeeting = meetingId => {
  return {
    type: DELETE_MEETING,
    payload: {
      meetingId
    }
  };
};

export const loadMeetings = () => {
  //everytime you call this action creator which will return an action below
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      let meetings = await fetchSampleData();
      dispatch({ type: FETCH_MEETINGS, payload: { meetings } }); //dispatches an action
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
