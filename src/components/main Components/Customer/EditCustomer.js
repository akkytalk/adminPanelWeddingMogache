import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../redux/action";

import {
  Button,
  Col,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  FormGroup,
} from "reactstrap";
import CustomInput from "../../../views/custom/CustomInput";
import CustomSelect from "../../../views/custom/CustomSelect";

function EditCustomer(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
    id: props.data?.id,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Vendor:", values);

    const user = new FormData();

    user.append("name", values.name);

    user.append("email", values.email);
    user.append("mobile", values.mobile);

    user.append("role", "user");

    user.append("password", values.password);
    user.append("password_confirmation", values.password_confirmation);
    console.log("Data of Vendor:", user);
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
        <ModalHeader toggle={toggle}>Edit Vendor</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: props.data ? props.data.name : "",
              email: props.data ? props.data.email : "",
              mobile: props.data ? props.data.mobile : "",

              role: "user",
              password: "",
              password_confirmation: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Customer Name is required"),

              mobile: Yup.string().required("Phone Number is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="discount">Full Name</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Full Name"
                        className={
                          "form-control" +
                          (formProps.errors.name && formProps.touched.name
                            ? " is-invalid"
                            : "")
                        }
                      />

                      <ErrorMessage
                        name="name"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="discount">Enter Phone</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="mobile"
                        id="mobile"
                        placeholder="Enter Phone Number"
                        className={
                          "form-control" +
                          (formProps.errors.mobile && formProps.touched.mobile
                            ? " is-invalid"
                            : "")
                        }
                      />

                      <ErrorMessage
                        name="mobile"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="email">Enter Email</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Enter Email"
                        className="form-control"
                      />
                    </InputGroup>
                  </Col>
                  {/* <Col md={6}>
                    <Label for="discount">Select Image</Label>
                    <FormGroup>
                      {props?.data?.image == "nofile.pdf" ? (
                        <InputGroup>
                          <input
                            type="file"
                            name="image"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                        </InputGroup>
                      ) : (
                        <InputGroup>
                          <a
                            target={"_blank"}
                            href={`https://uditsolutions.in/astrowars/storage/app/public/users/${props.data?.image}`}
                          >
                            {props.data?.image}
                          </a>
                          <input
                            type="file"
                            name="image"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                        </InputGroup>
                      )}
                    </FormGroup>
                  </Col> */}
                </Row>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="password">Enter Password</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        className="form-control"
                      />
                    </InputGroup>
                  </Col>

                  <Col md={6}>
                    <Label for="password_confirmation">
                      Enter Confirm Password
                    </Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        placeholder="Enter Confirm Password"
                        className="form-control"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <br />
                <Row style={{ justifyContent: "center" }}>
                  <Col md={4}>
                    <Button type="reset" color="danger" block>
                      <b>Reset</b>
                    </Button>
                  </Col>
                  <Col md={4}>
                    <Button
                      type="submit"
                      disabled={formProps.isSubmitting}
                      color="primary"
                      block
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
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
    onDeleteCustomer: (data, id) => dispatch(actions.deleteCustomer(data, id)),
    onPostCustomerData: (data, user, toggle) =>
      dispatch(actions.postCustomerData(data, user, toggle)),
    onUpdateCustomerData: (data, user, toggle) =>
      dispatch(actions.updateCustomerData(data, user, toggle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditCustomer);
