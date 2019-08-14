import { createReducer } from "../../app/common/util/reducerUtils";
import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from "./asyncConstants";

const initialState = {
    loading: false,
    elementName: null
}

const asyncActionStarted = (state, payload) => {
    return {
        ...state, //good practice to load state properties
        loading: true, //and then write what changes we want to make to our prev state
        elementName: payload
    }
}

const asyncActionFinished = (state) => {
    return {
        ...state, //good practice to load state properties
        loading: false, //and then write what changes we want to make to our prev state
        elementName: null
    }
}

const asyncActionError = (state) => {
    return {
        ...state, //good practice to load state properties
        loading: false, //and then write what changes we want to make to our prev state
        elementName: null
    }
}

export default createReducer(initialState, {
    [ASYNC_ACTION_START]: asyncActionStarted,
    [ASYNC_ACTION_FINISH]: asyncActionFinished,
    [ASYNC_ACTION_ERROR]: asyncActionError
})