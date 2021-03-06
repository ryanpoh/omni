import { toastr } from 'react-redux-toastr';
import { createNewMeeting } from '../../app/common/util/helpers';
import firebase from '../../app/config/firebase';
import { FETCH_MEETINGS } from './meetingConstants';
import { asyncActionStart } from '../../features/async/asyncActions';
import { asyncActionFinish } from '../../features/async/asyncActions';
import { asyncActionError } from '../../features/async/asyncActions';

export const createMeeting = meeting => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    dispatch(asyncActionStart())
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
      dispatch(asyncActionFinish())
      toastr.success('Success!', 'Meeting has been created');
      return createdMeeting;
    } catch (error) {
      dispatch(asyncActionError())
      toastr.error('Oops', 'Something went wrong! :(');
    }
  };
};

export const updateMeeting = meeting => {
  //comparing js date with Firestore timestamp with isEqual
  return async (dispatch, getState) => {
    const firestore = firebase.firestore();
    try {
      dispatch(asyncActionStart())
      let meetingDocRef = firestore.collection('meetings').doc(meeting.id);
      let dateEqual = getState().firestore.ordered.meetings[0].date.isEqual(
        meeting.id
      );
      if (!dateEqual) {
        let batch = firestore.batch();
        batch.update(meetingDocRef, meeting);

        let meetingAttendeeRef = firestore.collection('meeting_attendee');
        let meetingAttendeeQuery = await meetingAttendeeRef.where(
          'meetingId',
          '==',
          meeting.id
        );
        let meetingAttendeeQuerySnap = await meetingAttendeeQuery.get();

        for (let i = 0; i < meetingAttendeeQuerySnap.docs.length; i++) {
          let meetingAttendeeDoc = firestore
            .collection('meeting_attendee')
            .doc(meetingAttendeeQuerySnap.docs[i].id);

          batch.update(meetingAttendeeDoc, {
            meetingDate: meeting.date
          });
        }
        await batch.commit();
     
      } else {
        await meetingDocRef.update(meeting);
      }
      dispatch(asyncActionFinish())
      toastr.success('Success!', 'Meeting has been updated');
    } catch (error) {
      dispatch(asyncActionError())
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
  const message = cancelled
    ? 'Are you sure you want to cancel the meeting?'
    : 'This will reactivate the meeting, are you sure?';

  try {
    toastr.confirm(message, {
      onOk: async () =>
        await firestore.update(`meetings/${meetingId}`, {
          cancelled: cancelled
        })
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMeetingsForDashboard = lastMeeting => async (
  dispatch,
  getState
) => {
  let today = new Date();
  const firestore = firebase.firestore();
  const meetingsRef = firestore.collection('meetings');

  try {
    dispatch(asyncActionStart());
    let startAfter =
      lastMeeting &&
      (await firestore
        .collection('meetings')
        .doc(lastMeeting.id)
        .get());

    let query; //executes the query and returns the query from firestore

    lastMeeting
      ? (query = meetingsRef
          .where('date', '>=', today)
          .orderBy('date')
          .startAfter(startAfter)
          .limit(2)) // query for meetings after last meeting
      : (query = meetingsRef
          .where('date', '>=', today) // doesnt show all meeting. only the ones after today
          .orderBy('date')
          .limit(2)); // only for initial query

    let querySnap = await query.get();

    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
    }

    let meetings = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let mtg = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      meetings.push(mtg);
    }
    dispatch({ type: FETCH_MEETINGS, payload: { meetings } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const addMeetingComment = (meetingId, values, parentId) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const profile = getState().firebase.profile;
  const user = firebase.auth().currentUser;
  let newComment = {
    parentId: parentId,
    displayName: profile.displayName,
    photoURL: profile.photoURL || '/assets/user.png',
    uid: user.uid,
    text: values.comment,
    date: Date.now()
  };
  try {
    await firebase.push(`meeting_chat/${meetingId}`, newComment);
  } catch (error) {
    console.log(error);
    toastr.error('Oops', 'Problem adding comment');
  }
};
