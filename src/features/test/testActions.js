import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './testConstants';
import { asyncActionFinish } from '../async/asyncActions';
import { ASYNC_ACTION_START } from '../async/asyncConstants';

//action creator
export const incrementCounter = () => {
  return {
    //action is an Object
    type: INCREMENT_COUNTER
  };
};

//action creator
export const decrementCounter = () => {
  return {
    //action is an Object
    type: DECREMENT_COUNTER
  };
};

const delay = ms => {
  //faking some delays

  //will only give a delay once we get data 'resolve'
  return new Promise(resolve => setTimeout(resolve, ms)); //when Promise resolves it will set timeout, whivh will save resolve and ms
};

export const incrementAsync = name => {
  return async dispatch => {
    dispatch({ type: ASYNC_ACTION_START, payload: name }); //start our actions. our async reducer is going to set the loading flag in our store to true
    await delay(1000); //await is linked to async, where it will only run once the statement in await is fully completed
    dispatch(incrementCounter()); //equivalent to {INCREMENT_COUNTER}
    dispatch(asyncActionFinish());
  }; //dispatch is now available thanks to thunk middleware. dispatch allows us to dispatch actions inside our actioncreators
};

export const decrementAsync = name => {
  return async dispatch => {
    dispatch({ type: ASYNC_ACTION_START, payload: name }); //everything launches in order. but await will pause the program until the whole await line is fully loaded, only then it will continue
    await delay(1000);
    dispatch({ type: DECREMENT_COUNTER }); //just to prove the point we can use {type: DECREMENT_COUNTER}
    dispatch(asyncActionFinish());
  };
};
