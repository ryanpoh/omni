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

