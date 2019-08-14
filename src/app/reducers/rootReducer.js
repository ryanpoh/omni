import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import testReducer from "../../features/test/testReducer";
import meetingReducer from "../../features/meeting/meetingReducer";
import modalReducer from "../../features/modals/modalReducer";

const rootReducer = combineReducers({
  form: FormReducer,
  test: testReducer,
  meetings: meetingReducer,
  modals: modalReducer
});

export default rootReducer;
