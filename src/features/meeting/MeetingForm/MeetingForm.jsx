import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";

class MeetingForm extends Component {
  state = {
    title: "",
    date: "",
    branch: "",
    venue: "",
    chairedBy: ""
  };

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
    } else {
      this.props.createMeeting(this.state);
    }

  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    const { cancelFormOpen } = this.props;
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
          <Button onClick={cancelFormOpen} type='button'>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default MeetingForm;
