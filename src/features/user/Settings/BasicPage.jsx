import React, { Component } from 'react';
import { Segment, Form, Header, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { addYears } from 'date-fns';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import TextInput from '../../../app/common/form/TextInput';
import RadioInput from '../../../app/common/form/RadioInput';

//addYears allows us to set a max age restriction

class BasicPage extends Component {
  render() {
    const { pristine, submitting, handleSubmit, updateProfile } = this.props;
    return (
      <Segment>
        <Header dividing size='large' content='Basics' />
        <Form onSubmit={handleSubmit(updateProfile)}>
          <Field
            width={8}
            name='displayName'
            type='text'
            component={TextInput}
            placeholder='Known As'
          />
          <Form.Group inline>
            <label>Gender: </label>
            <Field
              name='gender'
              type='radio'
              value='male'
              label='Male'
              component={RadioInput}
            />
            <Field
              name='gender'
              type='radio'
              value='female'
              label='Female'
              component={RadioInput}
            />
          </Form.Group>

          <Field
            width={8}
            name='dateOfBirth'
            component={DateInput}
            placeholder='Date of Birth'
            dateFormat='dd LLL yyyy'
            showYearDropdown={true}
            showMonthDropdown={true}
            dropdownMode='select'
            maxDate={addYears(new Date(), -18)}
          />

          <Field
            name='city'
            placeholder='Home Town'
            options={{ types: ['(cities)'] }}
            label='Female'
            component={PlaceInput}
            width={8}
          />
          <Divider />
          <Button
            disabled={pristine || submitting}
            size='large'
            positive
            content='Update Profile'
          />
        </Form>
      </Segment>
    );
  }
}

export default reduxForm({ form: 'userProfile', enableReinitialize: true, destroyOnUnmount: false })( //destroyOnUnmount enables us to swap between forms while retaining data. Because bby default, when we unmount a form component we will destroy the initial data too
  //reduxForm allows us to have the handleSubmit method in our props
  BasicPage
); // enableReinitialize will make sure that the initialValues of form will appear eventhough page is refreshed
