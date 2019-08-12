import { CREATE_MEETING, UPDATE_MEETING, DELETE_MEETING } from "./meetingConstants";

export const createMeeting = meeting => {
    return {
        type: CREATE_MEETING,
        payload: {
            meeting
        }
    }
}

export const updateMeeting = meeting => {
    return {
        type: UPDATE_MEETING,
        payload: {
            meeting
        }
    }
}

export const deleteMeeting = meetingId => {
    return {
        type: DELETE_MEETING,
        payload: {
            meetingId
        }
    }
}