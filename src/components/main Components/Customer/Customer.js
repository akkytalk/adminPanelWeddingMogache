import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table,
  FormGroup,
} from "reactstrap";
import FA from "react-fontawesome";

import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../redux/action";
import CustomSelect from "./../../../views/custom/CustomSelect";
import EditCustomer from "./EditCustomer";

function Customer(props) {
  const accessToken = `${props.login?.login?.token?.token}`;

  let data = {
    token: accessToken,
  };

  console.log("data", data);

  useEffect(() => {
    props.onCustomerGetData(data);
  }, []);

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Customer:", values);

    const user = new FormData();

    user.append("name", values.first_name + " " + values.last_name);
    user.append("email", values.email);
    user.append("mobile", values.mobile);

    user.append("password", values.password);
    user.append("role", "user");
    user.append("password_confirmation", values.password_confirmation);

    console.log("Data of Customer:", user);
    props.onPostCustomerData(data, user, toggle);
    setSubmitting(true);
    return;
  };

  //   console.log("user id", props.login?.login?.user?.id);

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="">
          <strong>Customer</strong>
          {/* <Input
            type="text"
            placeholder="Search By Name and Enrollment No"
            className="ml-5"
            style={{ width: "300px" }}
            value={searchTerm}
            onChange={handleChange}
          />
          <Input
            type="select"
            className="ml-5"
            style={{ width: "300px" }}
            value={filter}
            onChange={handleFilterChange}
          >
            <option>Select Filter</option>
            <option value="uploaded">Only Uploaded</option>
            <option value="notuploaded">Not Uploaded</option>
            <option value="uploaded&approved">Uploaded & Approved</option>
          </Input>
          {props.login?.login?.user.role !== "faculty" && (
            */}
          <Button
            className="btn-success  float-right"
            onClick={() => {
              toggle();
            }}
          >
            Add Customer
          </Button>
        </div>
        <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add New Customer</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                mobile: "",
                password: "",
                password_confirmation: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                first_name: Yup.string().required("First Name is required"),
                last_name: Yup.string().required("Last Name is required"),
                password: Yup.string().required("Password is required"),
                mobile: Yup.string().required("mobile Number is required"),
                password_confirmation: Yup.string().required(
                  "Confirm Password is required"
                ),
              })}
            >
              {(formProps) => (
                <Form>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="discount">First Name</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="first_name"
                          id="first_name"
                          placeholder="Enter First Name"
                          className={
                            "form-control" +
                            (formProps.errors.first_name &&
                            formProps.touched.first_name
                              ? " is-invalid"
                              : "")
                          }
                        />

                        <ErrorMessage
                          name="first_name"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="discount">Last Name</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="last_name"
                          id="last_name"
                          placeholder="Enter Last Name"
                          className={
                            "form-control" +
                            (formProps.errors.last_name &&
                            formProps.touched.last_name
                              ? " is-invalid"
                              : "")
                          }
                        />

                        <ErrorMessage
                          name="last_name"
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
                    {/* <Col md={6}>
                      <Label for="discount">Select Image</Label>
                      <FormGroup>
                        <InputGroup>
                          <input
                            component={CustomSelect}
                            type="file"
                            name="image"
                            id="image"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              );
                            }}
                            className="form-group"
                          />
                        </InputGroup>
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
      </CardHeader>
      <CardBody>
        <table className="table table-sm" style={{ fontSize: "12px" }}>
          <thead>
            <tr>
              {/* <th scope="col">user Id.</th> */}
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              {/* <th scope="col">Status</th> */}
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {props.customer.length > 0 ? (
              props.customer?.map((user, index) => {
                if (user.role == "user")
                  return (
                    <tr key={index}>
                      {/* <td>{user.user_id}</td> */}
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      {/* <td>
                        {user.status === true ? "available" : "not available"}
                      </td> */}

                      <td className="d-flex">
                        <EditCustomer data={user} />

                        <Button
                          className="btn-danger ml-3 p-1"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this Customer?"
                              )
                            )
                              props.onDeleteCustomer(data, user.id);
                          }}
                        >
                          <i
                            className="fa fa-trash-alt "
                            value={user.id}
                            aria-hidden="true"
                          ></i>
                        </Button>
                      </td>
                    </tr>
                  );
              })
            ) : (
              <tr>
                <td colSpan={3}>No users</td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
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
    onUpdateCustomerData: (data, id) =>
      dispatch(actions.updateCustomerData(data, id)),
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
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
