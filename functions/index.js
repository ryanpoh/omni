const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const newActivity = (type, meeting, id) => {
  return {
    type: type,
    meetingDate: meeting.date,
    chairedBy: meeting.chairedBy,
    title: meeting.title,
    photoURL: meeting.chairPhotoURL,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    chairUid: meeting.chairUid,
    meetingId: id
  };
};

exports.createActivity = functions.firestore
  .document('meetings/{meetingId}')
  .onCreate(meeting => {
    let newMeeting = meeting.data();
    console.log(newMeeting);

    const activity = newActivity('newMeeting', newMeeting, meeting.id);

    console.log(activity);

    return admin
      .firestore()
      .collection('activity')
      .add(activity)
      .then(docRef => {
        return console.log('Activity created with ID: ', docRef.id);
      })
      .catch(err => {
        return console.log('Error adding activity', err);
      });
  });

exports.cancelActivity = functions.firestore
  .document('meetings/{meetingId}')
  .onUpdate((meeting, context) => {
    let updatedMeeting = meeting.after.data();
    let previousMeetingData = meeting.before.data();
    console.log({ meeting });
    console.log({ context });
    console.log({ updatedMeeting });
    console.log({ previousMeetingData });
    console.log('v1')

    if (
      !updatedMeeting.cancelled ||
      updatedMeeting.cancelled === previousMeetingData.cancelled
    )
      return false;

    const activity = newActivity(
      'cancelledMeeting',
      updatedMeeting,
      context.params.meetingId
    );

    console.log({ activity });

    return admin
      .firestore()
      .collection('activity')
      .add(activity)
      .then(docRef => {
        return console.log('Activity created with ID: ', docRef.id);
      })
      .catch(err => {
        return console.log('Error adding activity', err);
      });
  });
