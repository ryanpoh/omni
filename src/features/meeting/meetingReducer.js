import { createReducer } from "../../app/common/util/reducerUtils";
import {
  UPDATE_MEETING,
  DELETE_MEETING,
  CREATE_MEETING
} from "./meetingConstants";

 const initialState = [
    {
      id: '1',
      title: 'Trip to Empire State building',
      date: '2018-03-21',
      category: 'culture',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
      branch: 'NY, USA',
      venue: 'Empire State Building, 5th Avenue, New York, NY, USA',
      venueLatLng: {
        lat: 40.7484405,
        lng: -73.98566440000002
      },
      chairedBy: 'Bob',
      chairPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
      attendees: [
        {
          id: 'a',
          name: 'Bob',
          photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
        },
        {
          id: 'b',
          name: 'Tom',
          photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
        }
      ]
    },
    {
      id: '2',
      title: 'Trip to Punch and Judy Pub',
      date: '2018-03-18',
      category: 'drinks',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
      branch: 'London, UK',
      venue: 'Punch & Judy, Henrietta Street, London, UK',
      venueLatLng: {
        lat: 51.5118074,
        lng: -0.12300089999996544
      },
      chairedBy: 'Tom',
      chairPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
      attendees: [
        {
          id: 'a',
          name: 'Bob',
          photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
        },
        {
          id: 'b',
          name: 'Tom',
          photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
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
