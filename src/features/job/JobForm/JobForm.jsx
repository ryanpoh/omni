import React, { Component } from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createJob } from '../jobActions';
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
import { withFirestore } from 'react-redux-firebase';

const mapState = (state, ownProps) => {
  let job = {};

  return {
    job,
    loading: state.async.loading
  };
};

const actions = {
  createJob,
};

const validate = combineValidators({
  title: isRequired({ message: 'The job title is required.' }),
  client: isRequired({ message: 'The client is required.' }),
  description: composeValidators(
    isRequired({ message: 'Please enter a description.' }),
    hasLengthGreaterThan(4)({ message: 'Please enter at least 5 characters.' })
  )(),
  date: isRequired('date')
});

const client = [
  { key: 'nike', text: 'Nike', value: 'nike' },
  { key: 'adidas', text: 'Adidas', value: 'adidas' },
  { key: 'topman', text: 'Topman', value: 'topman' }
];

class JobForm extends Component {

  //because when creating a meeting, it does not have an id yet. But if looking at existing meeting, it has an id
  doHandleSubmit = async values => {
    try {
      await this.props.createJob(values);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      history,
      invalid,
      submitting,
      pristine,
      loading
    } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Job Details' />
            <Form
              onSubmit={this.props.handleSubmit(this.doHandleSubmit)}
              autoComplete='off'
            >
              <Field
                name='title'
                component={TextInput}
                placeholder='Give your job a name.'
              />
              <Field
                name='client'
                component={SelectInput}
                options={client}
                //multiple = {true}  //allows multiple category selections
                placeholder='What is your job about?'
              />
              <Field
                name='description'
                component={TextArea}
                rows={3}
                placeholder='Tell us about your job'
              />
              <Header sub color='teal' content='Job Details' />
              <Field
                name='date'
                component={DateInput}
                dateFormat='dd LLL yyyy h:mm a' //will be available in {...rest} object in DateInput component. Note 'LLL' is month
                showTimeSelect //shows time picker
                timeFormat='HH:mm'
                placeholder='Job date'
              />
              <Button
                disabled={invalid || submitting || pristine} //pristine means brand new state
                positive
                loading={loading}
                type='submit'
              >
                Submit
              </Button>
              <Button
                onClick={() => history.push(`/analytics`)} //wrap these in an arrow function because you don't want the functions to immediatly run wahen page loads
                
                type='button'
                disabled={loading}
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

// connect parameters are both reduxForm and JobForm. whereas reduxForm's parameter is only JobForm
export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: 'jobForm', validate })(
      JobForm
    )
  )
);
