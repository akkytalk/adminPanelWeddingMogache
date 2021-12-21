import React, { Component } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, Redirect } from "react-router-dom";
import CustomInput from "../views/custom/CustomInput";
import CustomSelect from "../views/custom/CustomSelect";
import {
  InputGroup,
  InputGroupAddon,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { postSignup } from "../redux/action";
import { connect, useDispatch } from "react-redux";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    let data = {
      name: values.name,
      mobile: values.mobile,
      location: values.location,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
      role: "customer",
    };
    console.log(data);
    this.props.postSignup(data);
    setSubmitting(true);
    return;
  };

  render() {
    if (this.props.login?.login?.length !== 0) {
      return <Redirect to={"/"} />;
    } else if (this.props.login?.isLoading) {
      //Spinner when service data sending under processing
      return (
        <div className="pizza-corner">
          <div
            className="col-xs-12 col-sm-12 col-md-5 col-lg-4"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Card className="p-5">
              <CardBody>
                <div
                  className="spinner-grow text-success col-xs-12 col-sm-12 col-md-5 col-lg-4"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          backgroundImage:
            " url(https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80)",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          zIndex: "-1",
        }}
      >
        <div className="auth-wrapper align-items-center">
          <div className="container" style={{ paddingTop: 35 }}>
            <div className="no-gutters justify-content-center row">
              <div className="col-md-6 col-lg-4">
                <div className="p-4">
                  <h3
                    className="font-medium mb-3"
                    style={{ color: "whitesmoke" }}
                  >
                    Sign Up
                  </h3>
                  <Formik
                    initialValues={{
                      name: "",
                      email: "",
                      mobile: "",
                      location: "",
                      password: "",
                      password_confirmation: "",
                    }}
                    onSubmit={this.handleSubmit}
                    validationSchema={Yup.object().shape({
                      email: Yup.string().required("Enter Your Email"),
                      password: Yup.string().required("Enter Your Password"),
                      password_confirmation: Yup.string().required(
                        "Confirmed password required"
                      ),
                    })}
                  >
                    {(formProps) => (
                      <Form className="mt-3">
                        {/* <label
                          htmlFor="first_name"
                          className="mt-3 font-medium"
                          style={{ color: "white" }}
                        >
                          First Name
                        </label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <span className="input-group-text">
                              <i className="ti-user" />
                            </span>
                          </InputGroupAddon>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="first_name"
                            id="first_name"
                            className="form-control"
                            placeholder="Enter First Name"
                          />
                        </InputGroup> */}
                        {/* <label
                          htmlFor="middle_name"
                          className="mt-3 font-medium"
                          style={{ color: "whitesmoke" }}
                        >
                          Middle Name
                        </label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <span className="input-group-text">
                              <i className="ti-user" />
                            </span>
                          </InputGroupAddon>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="middle_name"
                            id="middle_name"
                            className="form-control"
                            placeholder="Enter middle Name"
                          />
                        </InputGroup> */}
                        <label
                          htmlFor="name"
                          className="mt-3 font-medium"
                          style={{ color: "whitesmoke" }}
                        >
                          Name
                        </label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <span className="input-group-text">
                              <i className="ti-user" />
                            </span>
                          </InputGroupAddon>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            placeholder="Enter Name"
                          />
                        </InputGroup>
                        <label
                          htmlFor="email"
                          className="mt-3 font-medium"
                          style={{ color: "whitesmoke" }}
                        >
                          Email
                        </label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <span className="input-group-text">
                              <i className="ti-user" />
                            </span>
                          </InputGroupAddon>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="email"
                            id="email"
                            className={
                              "form-control" +
                              (formProps.errors.email && formProps.touched.email
                                ? " is-invalid"
                                : "")
                            }
                            placeholder="yourname@company.com"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                        <label
                          htmlFor="password"
                          className="mt-3 font-medium"
                          style={{ color: "whitesmoke" }}
                        >
                          Password
                        </label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <span className="input-group-text">
                              <i className="ti-pencil" />
                            </span>
                          </InputGroupAddon>
                          <Field
                            component={CustomInput}
                            type="password"
                            name="password"
                            id="password"
                            className={
                              "form-control" +
                              (formProps.errors.password &&
                              formProps.touched.password
                                ? " is-invalid"
                                : "")
                            }
                            placeholder="* * * * * *"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                        <label
                          htmlFor="email"
                          className="mt-3 font-medium"
                          style={{ color: "whitesmoke" }}
                        >
                          Confirm Password
                        </label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <span className="input-group-text">
                              <i className="ti-pencil" />
                            </span>
                          </InputGroupAddon>
                          <Field
                            component={CustomInput}
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            className={
                              "form-control" +
                              (formProps.errors.password_confirmation &&
                              formProps.touched.password_confirmation
                                ? " is-invalid"
                                : "")
                            }
                            placeholder="* * * * * *"
                          />
                          <ErrorMessage
                            name="password_confirmation"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                        <label
                          htmlFor="location"
                          className="mt-3 font-medium"
                          style={{ color: "whitesmoke" }}
                        >
                          City Name
                        </label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <span className="input-group-text">
                              <i className="ti-user" />
                            </span>
                          </InputGroupAddon>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="location"
                            id="location"
                            placeholder="Enter city Name"
                          />
                        </InputGroup>
                        <label
                          htmlFor="mobile"
                          className="mt-3 font-medium"
                          style={{ color: "whitesmoke" }}
                        >
                          Phone Number
                        </label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <span className="input-group-text">
                              <i className="ti-user" />
                            </span>
                          </InputGroupAddon>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="mobile"
                            id="mobile"
                            placeholder="Enter Mobile Number"
                          />
                        </InputGroup>
                        {/* <label
                          htmlFor="lastname"
                          className="mt-3 font-medium"
                          style={{ color: "whitesmoke" }}
                        >
                          Last Name
                        </label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <span className="input-group-text">
                              <i className="ti-user" />
                            </span>
                          </InputGroupAddon>
                          <Field
                            component={CustomInput}
                            type="text"
                            name="lastname"
                            id="lastname"
                            placeholder="Enter Last Name"
                          />
                        </InputGroup>
                        <label
                          htmlFor="type"
                          className="mt-3 font-medium"
                          style={{ color: "whitesmoke" }}
                        >
                          Register As
                        </label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <span className="input-group-text">
                              <i className="ti-user" />
                            </span>
                          </InputGroupAddon>
                          <Field component={CustomSelect} name="type" id="type">
                            <option hidden>Select Type</option>
                            <option disabled>Select Type</option>
                            <option selected>User</option>
                            <option>Transporter</option>
                          </Field>
                        </InputGroup> */}
                        <div className="mt-3 mb-3 row">
                          <div className="col-12">
                            <Button
                              type="submit"
                              disabled={formProps.isSubmitting}
                              color="primary"
                              size="lg"
                              block
                            >
                              Sign Up
                            </Button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>

                  <div>
                    <span style={{ color: "white" }}>
                      {" "}
                      Already have an account?
                    </span>
                    <Link to="/login">Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postSignup: (data) => {
    dispatch(postSignup(data));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
