import React, { Fragment } from "react";
import {
  Card,
  Button,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  CardBody,
} from "reactstrap";
import * as Yup from "yup";
import { postLogin } from "../redux/action/LoginCreators";

import { Formik, Form, Field, ErrorMessage } from "formik";

import CustomInput from "../views/custom/CustomInput";

import FA from "react-fontawesome";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../components/PizzaCorner/PizzaCorner.css";

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postLogin: (data) => {
    dispatch(postLogin(data));
  },
});

function Login2(props) {
  const handleSubmit = (values, setSubmitting) => {
    let data = {
      email: values.email,
      password: values.password,
    };
    console.log(data);
    props.postLogin(data);
    setSubmitting(false);
    return;
  };

  console.log("login data", props.login?.login);

  if (props.login?.login?.length !== 0) {
    return <Redirect to={"/"} />;
  } else if (props.login?.isLoading) {
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
    <Fragment>
      <div className="pizza-corner" style={{ width: "100vw", height: "100vh" }}>
        <div className="auth-wrapper align-items-center">
          <div className="container" style={{ paddingTop: 35 }}>
            <div className="no-gutters justify-content-center row">
              <div className="col-md-6 col-lg-4">
                <div
                  className="p-4"
                  style={{ background: "transparent", border: "none" }}
                >
                  <h3
                    className="mb-3"
                    style={{
                      fontSize: "4em",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Sign In
                  </h3>
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .required("Enter Your Email")
                        .email("Invalid Email address"),
                      password: Yup.string().required("Enter Your Password"),
                    })}
                  >
                    {(formProps) => (
                      <Form className="mt-3">
                        <FormGroup>
                          <InputGroup size="lg">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <FA name={"user-circle"} />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Field
                              component={CustomInput}
                              type="email"
                              name="email"
                              id="email"
                              placeholder="Enter Email"
                            />
                          </InputGroup>
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback text-center"
                          />
                        </FormGroup>

                        <FormGroup>
                          <InputGroup size="lg">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <FA name={"unlock-alt"} />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Field
                              component={CustomInput}
                              type="password"
                              name="password"
                              id="password"
                              placeholder="Enter Password"
                            />
                          </InputGroup>
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback text-center"
                          />
                        </FormGroup>

                        <div className="mt-3 mb-3 row">
                          <div className="col-12">
                            <Button
                              type="submit"
                              disabled={formProps.isSubmitting}
                              color="primary"
                              size="lg"
                              block
                            >
                              Log In
                            </Button>
                            <span className="text-danger pt-3 text-center">
                              {props.login?.errMess
                                ? props.login?.errMess?.message ===
                                  "Error:401 Unauthorized"
                                  ? "Wrong Login credentials"
                                  : props.login?.errMess?.message
                                : null}
                            </span>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <Button
                      className="btn-warning mt-4"
                      type="button"
                      size="lg"
                      block
                    >
                      New User ? Register Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login2);

// export default Login2;
