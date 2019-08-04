import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import MeetingList from "../MeetingList/MeetingList";
import MeetingForm from "../MeetingForm/MeetingForm";
import cuid from "cuid";

const meetingsFromDashboard = [
  {
    id: "1",
    title: "Trip to Tower of London",
    date: "2018-03-27T11:00:00+00:00",
    category: "culture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    branch: "London, UK",
    venue: "Tower of London, St Katharine's & Wapping, London",
    chairedBy: "Bob",
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
    title: "Trip to Punch and Judy Pub",
    date: "2018-03-28T14:00:00+00:00",
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    branch: "London, UK",
    venue: "Punch & Judy, Henrietta Street, London, UK",
    chairedBy: "Tom",
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

class MeetingDashboard extends Component {
  state = {
    meetings: meetingsFromDashboard,
    isOpen: false
  };

  handleIsOpenToggle = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen
    }));
  };

  handleCreateMeeting = newMeeting => {
    newMeeting.id = cuid();
    newMeeting.hostPhotoURL = "/assets/user.png";
    this.setState(({ meetings }) => ({
      meetings: [...meetings, newMeeting],
      isOpen: false
    }));
  };

  render() {
    const { meetings, isOpen } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <MeetingList meetings={meetings} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            onClick={this.handleIsOpenToggle}
            positive
            content='Create Meeting'
          />
          {isOpen && (
            <MeetingForm
              createMeeting={this.handleCreateMeeting}
              cancelFormOpen={this.handleIsOpenToggle}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default MeetingDashboard;
