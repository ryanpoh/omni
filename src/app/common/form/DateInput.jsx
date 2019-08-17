import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({
  input: { value, onChange, onBlur },
  width,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  // ...rest contains the rest of the properties that we pass to the DateInput component.

  return (
    <Form.Field error={touched && !!error}>
      <DatePicker
        {...rest} //excludes all the destrcutured properties above that is before rest
        placeholderText={placeholder}
        selected={
          // below is a code to test whether it is a JS Date, Firestore date or nothing at all (null)
          value
            ? Object.prototype.toString.call(value) !== '[object Date]'
              ? value.toDate()
              : value
            : null
        } // only way to test if something is a Date object. is it is true (where it is not a Date object) then it must be a Firestore Timestamp. so we convert it into a date format using toDate() - which is a func provided by firestore
        onChange={onChange} //allows reduxForm to track changes to the input
        onBlur={(e, val) => onBlur(val)} //tells whether user clicked outside the datepicker or not (for validation error also)
        // e is our event and val is our date as a date format
        onChangeRaw={e => e.preventDefault()} //excuted when user types in the field. this prevents user from typing into the field
        //onBlur event changes the the javascript ISO time format into a string. we don't want this string format to be stored in our Firestore. So we have to disable onBlur
        //onBlur is used so the web app knows when we clicked in or clicked out into a form field which is then used to update the 'touched' status of that particular field. we then use this touched data for validation
      />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label> //error label
      )}
    </Form.Field>
  );
};

export default DateInput;
