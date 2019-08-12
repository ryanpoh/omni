import { createReducer } from "../../app/common/util/reducerUtils";
import {
  UPDATE_MEETING,
  DELETE_MEETING,
  CREATE_MEETING
} from "./meetingConstants";

const initialState = [
  {
    id: "1",
    title: "Meeting with Patricia London",
    date: "2018-03-27",
    category: "culture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    branch: "London, UK",
    venue: "Tower of London, St Katharine's & Wapping, London",
    chairedBy: "John",
    chairPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    attendees: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    ]
  },
  {
    id: "2",
    title: "Meeting with Lee and Judy",
    date: "2018-03-28",
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    branch: "London, UK",
    venue: "Punch & Judy, Henrietta Street, London, UK",
    chairedBy: "Raj",
    chairPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    attendees: [
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      }
    ]
  }
];

const createMeeting = (state, payload) => {
  return [...state, payload.meeting];
};

const updateMeeting = (state, payload) => {
  return [
    ...state.filter(meeting => meeting.id !== payload.meeting.id),
    payload.meeting
  ];
};

const deleteMeeting = (state, payload) => {
  return [...state.filter(meeting => meeting.id !== payload.meetingId)];
};

export default createReducer(initialState, {
  [CREATE_MEETING]: createMeeting,
  [UPDATE_MEETING]: updateMeeting,
  [DELETE_MEETING]: deleteMeeting
});
