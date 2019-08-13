/*global google*/
import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { createMeeting, updateMeeting } from "../meetingActions";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import cuid from "cuid";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";

const mapState = (state, ownProps) => {
  const meetingId = ownProps.match.params.id;

  let meeting = {};

  if (meetingId && state.meetings.length > 0) {
    meeting = state.meetings.filter(meeting => meeting.id === meetingId)[0];
  }

  return {
    initialValues: meeting
  };
};

const actions = {
  createMeeting,
  updateMeeting
};

const validate = combineValidators({
  title: isRequired({ message: "The meeting title is required." }),
  category: isRequired({ message: "The category is required." }),
  description: composeValidators(
    isRequired({ message: "Please enter a description." }),
    hasLengthGreaterThan(4)({ message: "Please enter at least 5 characters." })
  )(),
  branch: isRequired("branch"), // prints default error message
  venue: isRequired("venue"),
  date: isRequired("date")
});

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

class MeetingForm extends Component {
  state = {
    branchLatLng: {},
    venueLatLng: {}
  };

  //because when creating a meeting, it does not have an id yet. But if looking at existing meeting, it has an id
  doHandleSubmit = values => {
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      this.props.updateMeeting(values);
      this.props.history.push(`/meetings/${this.props.initialValues.id}`);
    } else {
      const newMeeting = {
        ...values,
        id: cuid(),
        chairPhotoURL: "/assets/user.png",
        chairedBy: "Bob"
      };
      this.props.createMeeting(newMeeting);
      this.props.history.push(`/meetings/${newMeeting.id}`);
    }
  };

  handleCitySelect = selectedCity => {
    //selects branch by city
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          branchLatLng: latlng
        });
      })
      .then(() => {
        this.props.change("branch", selectedCity);
      });
  };

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        });
      })
      .then(() => {
        this.props.change("venue", selectedVenue);
      });
  };

  render() {
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine
    } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Meeting Details' />
            <Form
              onSubmit={this.props.handleSubmit(this.doHandleSubmit)}
              autoComplete='off'
            >
              <Field
                name='title'
                component={TextInput}
                placeholder='Give your meeting a name.'
              />
              <Field
                name='category'
                component={SelectInput}
                options={category}
                //multiple = {true}  //allows multiple category selections
                placeholder='What is your meeting about?'
              />
              <Field
                name='description'
                component={TextArea}
                rows={3}
                placeholder='Tell us about your meeting'
              />
              <Header sub color='teal' content='Meeting Location Details' />
              <Field
                name='branch'
                component={PlaceInput}
                options={{ types: ["(cities)"] }} //narrows down suggestions to just cities
                onSelect={this.handleCitySelect}
                placeholder='City branch where meeting will be held'
              />
              <Field
                name='venue'
                component={PlaceInput}
                options={{
                  location: new google.maps.LatLng(this.state.branchLatLng),
                  radius: 1000,
                  types: ["establishment"]
                }}
                onSelect={this.handleVenueSelect}
                placeholder='Meeting Venue'
              />
              <Field
                name='date'
                component={DateInput}
                dateFormat='dd LLL yyyy h:mm a' //will be available in {...rest} object in DateInput component. Note 'LLL' is month
                showTimeSelect //shows time picker
                timeFormat='HH:mm'
                placeholder='Meeting date'
              />

              <Button
                disabled={invalid || submitting || pristine} //pristine means brand new state
                positive
                type='submit'
              >
                Submit
              </Button>
              <Button
                onClick={
                  initialValues.id
                    ? () => history.push(`/meetings/${initialValues.id}`)
                    : () => history.push(`/meetings`) //wrap these in an arrow function because you don't want the functions to immediatly run wahen page loads
                }
                type='button'
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

// connect parameters are both reduxForm and MeetingForm. whereas reduxForm's parameter is only MeetingForm
export default connect(
  mapState,
  actions
)(reduxForm({ form: "meetingForm", validate })(MeetingForm));
