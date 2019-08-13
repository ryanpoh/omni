import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import testReducer from "../../features/test/testReducer";
import meetingReducer from "../../features/meeting/meetingReducer";

const rootReducer = combineReducers({
  form: FormReducer,
  test: testReducer,
  meetings: meetingReducer
});

export default rootReducer;
