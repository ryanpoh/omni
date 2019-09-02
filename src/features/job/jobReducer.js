import { createReducer } from "../../app/common/util/reducerUtils";
import {
  CREATE_JOB,
  FETCH_JOBS,
  FETCH_USER_JOBS
} from "./jobConstants";

 const initialState = [{
   jobs: [],
   userJobs: []
 }];

const createJob = (state, payload) => {
  return [...state, payload.job];
};

const fetchJobs = (state, payload) => {
  return {
    ...state, //copy current state
    jobs: payload.jobs
  }
}

const fetchUserJobs = (state, payload) => {
  return {
    ...state,
    userJobs: payload.jobs
  }
}

export default createReducer(initialState, { //links actions in xxxActions.js to reducer functions here
  [CREATE_JOB]: createJob,
  [FETCH_JOBS]: fetchJobs,
  [FETCH_USER_JOBS]: fetchUserJobs
});
