import React from "react";
import { Input } from "reactstrap";

const CustomSelect = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => <Input type="select" {...field} {...props} />;

export default CustomSelect;
