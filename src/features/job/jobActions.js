import { toastr } from 'react-redux-toastr';
import { createNewJob } from '../../app/common/util/helpers';
import firebase from '../../app/config/firebase';
import { FETCH_JOBS } from './jobConstants';
import { asyncActionStart } from '../async/asyncActions';
import { asyncActionFinish } from '../async/asyncActions';
import { asyncActionError } from '../async/asyncActions';

export const createJob = job => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    dispatch(asyncActionStart())
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const newJob = createNewJob(user, photoURL, job);
    try {
      let createdJob = await firestore.add('jobs', newJob);
      await firestore.set(`job_lookup/${createdJob.id}_${user.uid}`, {
        jobId: createdJob.id,
        userUid: user.uid,
        jobDate: job.date,
        client: job.client,
        chair: true
      });
      dispatch(asyncActionFinish())
      toastr.success('Success!', 'Great work, you just finished a job!');
      return createdJob;
    } catch (error) {
      dispatch(asyncActionError())
      toastr.error('Oops', 'Something went wrong with job update :(');
    }
  };
};

export const getJobsForDashboard = lastJob => async (
  dispatch,
  getState
) => {
  const firestore = firebase.firestore();
  const jobsRef = firestore.collection('jobs');

  try {
    dispatch(asyncActionStart());
    let startAfter =
      lastJob &&
      (await firestore
        .collection('jobs')
        .doc(lastJob.id)
        .get());

    let query; //executes the query and returns the query from firestore

    lastJob
      ? (query = jobsRef
          .orderBy('date')
          .startAfter(startAfter)
          .limit(2)) // query for meetings after last meeting
      : (query = jobsRef // doesnt show all meeting. only the ones after today
          .orderBy('date')
          .limit(2)); // only for initial query

    let querySnap = await query.get();

    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
    }

    let jobs = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let jb = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      jobs.push(jb);
    }
    dispatch({ type: FETCH_JOBS, payload: { jobs } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

