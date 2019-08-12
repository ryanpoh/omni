import { combineReducers } from "redux";
import testReducer from "../../features/test/testReducer";
import meetingReducer from "../../features/meeting/meetingReducer";

const rootReducer = combineReducers({
  test: testReducer,
  meetings: meetingReducer
});

export default rootReducer;
