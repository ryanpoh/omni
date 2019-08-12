import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import {connect} from 'react-redux';
import {createMeeting, updateMeeting} from '../meetingActions';
import cuid from 'cuid'

const mapState = (state, ownProps) => {
  const meetingId = ownProps.match.params.id;

  let meeting = {
    title: "",
    date: "", 
    branch: "",
    venue: "",
    chairedBy: ""
  }

  if (meetingId && state.meetings.length > 0) {
    meeting = state.meetings.filter(meeting => meeting.id === meetingId)[0]
  }


  return {
    meeting
  }
}

const actions ={
  createMeeting,
  updateMeeting
}

class MeetingForm extends Component {
  state = {...this.props.meeting};

  componentDidMount() {
    if (this.props.selectedMeeting !== null) {
      this.setState({
        ...this.props.selectedMeeting
      });
    }
  }

  //because when creating a meeting, it does not have an id yet. But if looking at existing meeting, it has an id
  handleFormSubmit = evt => {
    evt.preventDefault();
    if (this.state.id){
      this.props.updateMeeting(this.state)
      this.props.history.push(`/meetings/${this.state.id}`)
    } else {
      const newMeeting = {
        ...this.state,
        id: cuid(),
        hostPhotoURL: "/assets/user.png"
      }
      this.props.createMeeting(newMeeting);
      this.props.history.push(`/meetings`)
    }
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    const { title, date, branch, venue, chairedBy } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit} autoComplete='off'>
          <Form.Field>
            <label>Meeting Title</label>
            <input
              name='title'
              onChange={this.handleInputChange}
              value={title}
              placeholder='Meeting Title'
            />
          </Form.Field>
          <Form.Field>
            <label>Meeting Date</label>
            <input
              name='date'
              onChange={this.handleInputChange}
              value={date}
              type='date'
              placeholder='Meeting Date'
            />
          </Form.Field>
          <Form.Field>
            <label>Branch</label>
            <input
              name='branch'
              onChange={this.handleInputChange}
              value={branch}
              placeholder='Company branch where meeting is taking place'
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name='venue'
              onChange={this.handleInputChange}
              value={venue}
              placeholder='Enter the Venue of the meeting'
            />
          </Form.Field>
          <Form.Field>
            <label>Chaired By</label>
            <input
              name='chairedBy'
              onChange={this.handleInputChange}
              value={chairedBy}
              placeholder='Enter the name of person in charge'
            />
          </Form.Field>
          <Button positive type='submit'>
            Submit
          </Button>
          <Button onClick={this.props.history.goBack} type='button'>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(mapState, actions)(MeetingForm);
