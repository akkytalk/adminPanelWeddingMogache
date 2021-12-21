import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../redux/action";

import {
  Button,
  Col,
  InputGroup,
  InputGroupAddon,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import CustomInput from "../../../views/custom/CustomInput";

function EditCustomer(props) {
  const accessToken = `${props.login?.login?.success?.token}`;

  let data = {
    token: accessToken,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Customer:", values);

    let user = {
      id: props.user?.id,
      user_id: props.login?.login?.user?.id,
      vendor_id: values.vendor_id,
      name: values.name,
    };
    console.log("Data of Customer:", user);
    props.onUpdateCustomerData(data, user, toggle);
    setSubmitting(true);
  };

  return (
    <div>
      <Button
        className="btn-warning p-1"
        onClick={() => {
          toggle();
        }}
      >
        <i className="fa fa-edit" aria-hidden="true"></i>
      </Button>
      <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit User</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: props.user?.name,
              email: props.user?.email,
              mobile: props.user?.mobile,
              location: props.user?.location,
              password: props.user?.password,
              password_confirmation: props.user?.password_confirmation,
            }}
            onSubmit={handleSubmit}
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
                        //   style={{ color: "whitesmoke" }}
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
                  //   style={{ color: "whitesmoke" }}
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
                  //   style={{ color: "whitesmoke" }}
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
                  //   style={{ color: "whitesmoke" }}
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
                      (formProps.errors.password && formProps.touched.password
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
                  //   style={{ color: "whitesmoke" }}
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
                  //   style={{ color: "whitesmoke" }}
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
                  //   style={{ color: "whitesmoke" }}
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
                        //   style={{ color: "whitesmoke" }}
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
                        //   style={{ color: "whitesmoke" }}
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
                      Add Customer
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
    customer: state.customer.customer,
    vendor: state.vendor.vendor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCustomerGetData: (data) => dispatch(actions.customerGetData(data)),
    // onVendorGetData: (data) => dispatch(actions.vendorGetData(data)),
    onDeleteCustomer: (data, id) => dispatch(actions.deleteCustomer(data, id)),
    onPostCustomerData: (data, user, toggle) =>
      dispatch(actions.postCustomerData(data, user, toggle)),
    onUpdateCustomerData: (data, user, toggle) =>
      dispatch(actions.updateCustomerData(data, user, toggle)),
    onEditCustomerRow: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.editCustomerRow(
          data,
          id,
          editing,
          setEditing,
          currentUser,
          setCurrentUser
        )
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditCustomer);
