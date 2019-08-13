import React from "react";
import { Form, Label } from "semantic-ui-react";

const TextArea = ({
  input,
  rows,
  width,
  type,
  placeholder,
  meta: { touched, error } //error comes as object
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <textarea {...input} placeholder={placeholder} type={type} rows={rows} width={width} />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextArea;
