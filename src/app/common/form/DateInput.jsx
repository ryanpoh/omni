import React from "react";
import { Form, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({
  input,
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
        selected={input.value ? new Date(input.value) : null} //new Date converts the text date to a JS date
        onChange={input.onChange} //allows reduxForm to track changes to the input
        onBlur={input.onBlur} //tells whether user clicked outside the datepicker or not (for validation error also)
        onChangeRaw={(e) => e.preventDefault()} //excuted when user types in the field. this prevents user from typing into the field
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
