import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstants";

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