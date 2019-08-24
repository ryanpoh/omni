import {
  FETCH_MEETINGS
} from './meetingConstants';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../async/asyncActions';
import { fetchSampleData } from '../../app/data/mockApi';
import { toastr } from 'react-redux-toastr';
import { createNewMeeting } from '../../app/common/util/helpers';

export const createMeeting = meeting => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const newMeeting = createNewMeeting(user, photoURL, meeting);
    try {
      let createdMeeting = await firestore.add('meetings', newMeeting);
      await firestore.set(`meeting_attendee/${createdMeeting.id}_${user.uid}`, {
        meetingId: createdMeeting.id,
        userUid: user.uid,
        meetingDate: meeting.date,
        chair: true
      });
      toastr.success('Success!', 'Meeting has been created');
      return createdMeeting;
    } catch (error) {
      toastr.error('Oops', 'Something went wrong! :(');
    }
  };
};

export const updateMeeting = meeting => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    try {
      await firestore.update(`meetings/${meeting.id}`, meeting);
      toastr.success('Success!', 'Meeting has been updated');
    } catch (error) {
      toastr.error('Oops', 'Something went wrong! :(');
    }
  };
};

export const cancelToggle = (cancelled, meetingId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled ? 'Are you sure you want to cancel the meeting?' : 'This will reactivate the meeting, are you sure?'

  try {
    toastr.confirm(message, {
      onOk: async () => 
      await firestore.update(`meetings/${meetingId}`, {
        cancelled: cancelled
      })
    })

  } catch (error) {
    console.log(error);
  }
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
