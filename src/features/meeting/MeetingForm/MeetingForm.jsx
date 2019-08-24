/*global google*/
import React, { Component } from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createMeeting, updateMeeting, cancelToggle } from '../meetingActions';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import { withFirestore } from 'react-redux-firebase';

const mapState = (state, ownProps) => {
  const meetingId = ownProps.match.params.id;

  let meeting = {};

  if (
    state.firestore.ordered.meetings &&
    state.firestore.ordered.meetings.length > 0
  ) {
    meeting =
      state.firestore.ordered.meetings.filter(
        meeting => meeting.id === meetingId
      )[0] || {}; //returns an array so we still need to specify with [0]
  }

  return {
    initialValues: meeting,
    meeting
  };
};

const actions = {
  createMeeting,
  updateMeeting,
  cancelToggle
};

const validate = combineValidators({
  title: isRequired({ message: 'The meeting title is required.' }),
  category: isRequired({ message: 'The category is required.' }),
  description: composeValidators(
    isRequired({ message: 'Please enter a description.' }),
    hasLengthGreaterThan(4)({ message: 'Please enter at least 5 characters.' })
  )(),
  branch: isRequired('branch'), // prints default error message
  venue: isRequired('venue'),
  date: isRequired('date')
});

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];

class MeetingForm extends Component {
  state = {
    branchLatLng: {},
    venueLatLng: {}
  };

  async componentDidMount() {
    // data will appear in redux state
    const { firestore, match } = this.props;
    await firestore.setListener(`meetings/${match.params.id}`); // using match to get event id from routing params

  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`meetings/${match.params.id}`);
  }

  //because when creating a meeting, it does not have an id yet. But if looking at existing meeting, it has an id
  doHandleSubmit = async values => {
    values.venueLatLng = this.state.venueLatLng;

    try {
      if (this.props.initialValues.id) {
        if (Object.keys(values.venueLatLng).length === 0){
          values.venueLatLng = this.props.meeting.venueLatLng
        }
        this.props.updateMeeting(values);
        this.props.history.push(`/meetings/${this.props.initialValues.id}`);
      } else {
        let createdMeeting = await this.props.createMeeting(values);
        this.props.history.push(`/meetings/${createdMeeting.id}`);
      }
    } catch (error) {
      console.log(error);
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
        this.props.change('branch', selectedCity);
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
        this.props.change('venue', selectedVenue);
      });
  };

  render() {
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine,
      meeting,
      cancelToggle
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
                options={{ types: ['(cities)'] }} //narrows down suggestions to just cities
                onSelect={this.handleCitySelect}
                placeholder='City branch where meeting will be held'
              />
              <Field
                name='venue'
                component={PlaceInput}
                options={{
                  location: new google.maps.LatLng(this.state.branchLatLng),
                  radius: 1000,
                  types: ['establishment']
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
              <Button
                type='button'
                color={meeting.cancelled ? 'green' : 'red'}
                floated='right'
                content={
                  meeting.cancelled ? 'Reactivate Meeting' : 'Cancel Meeting'
                }
                onClick={() => cancelToggle(!meeting.cancelled, meeting.id)}
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

// connect parameters are both reduxForm and MeetingForm. whereas reduxForm's parameter is only MeetingForm
export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: 'meetingForm', validate, enableReinitialize: true })(
      MeetingForm
    )
  )
);
