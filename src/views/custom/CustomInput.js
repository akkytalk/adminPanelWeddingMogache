import React from "react";
import { Input } from "reactstrap";

const CustomInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => <Input {...field} {...props} />;

export default CustomInput;
