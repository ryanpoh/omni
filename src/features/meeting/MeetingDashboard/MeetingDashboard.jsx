import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import MeetingList from "../MeetingList/MeetingList";
import MeetingForm from "../MeetingForm/MeetingForm";
import cuid from "cuid";

const meetingsFromDashboard = [
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

class MeetingDashboard extends Component {
  state = {
    meetings: meetingsFromDashboard,
    isOpen: false,
    selectedMeeting: null
  };

  // handleIsOpenToggle = () => {
  //   this.setState(({ isOpen }) => ({
  //     isOpen: !isOpen
  //   }));
  // };

  handleCreateFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedMeeting: null
    });
  };

  handleCreateFormClose = () => {
    this.setState({
      isOpen: false
    });
  };

  handleSelectedMeeting = meeting => {
    console.log(meeting);
    this.setState({
      selectedMeeting: meeting,
      isOpen: true
    });
  };

  handleCreateMeeting = newMeeting => {
    newMeeting.id = cuid();
    newMeeting.hostPhotoURL = "/assets/user.png";
    this.setState(({ meetings }) => ({
      meetings: [...meetings, newMeeting],
      isOpen: false
    }));
  };

  handleUpdateMeeting = updatedMeeting => {
    this.setState(({ meetings }) => ({
      meetings: meetings.map(meeting => {
        if (meeting.id === updatedMeeting.id) {
          return { ...updatedMeeting };
        } else {
          return meeting;
        }
      }),
      isOpen: false,
      selectedMeeting: null
    }));
  };

  handleDeleteMeeting = id => {
    this.setState(({ meetings }) => ({
        meetings: meetings.filter(m => m.id !== id) 
    }))
  };

  render() {
    const { meetings, isOpen, selectedMeeting } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <MeetingList
            deleteMeeting ={this.handleDeleteMeeting}
            meetings={meetings}
            selectedMeeting={this.handleSelectedMeeting}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            onClick={this.handleCreateFormOpen}
            positive
            content='Create Meeting'
          />
          {isOpen && (
            <MeetingForm
              key={selectedMeeting ? selectedMeeting.id : 0}
              updateMeeting={this.handleUpdateMeeting}
              selectedMeeting={selectedMeeting}
              createMeeting={this.handleCreateMeeting}
              cancelFormOpen={this.handleCreateFormClose}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default MeetingDashboard;
