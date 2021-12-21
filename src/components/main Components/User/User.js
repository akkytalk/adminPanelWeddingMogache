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
import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../redux/action";
import EditCustomer from "./EditUser";

function Customer(props) {
  const accessToken = `${props.login?.login?.success?.token}`;

  let data = {
    token: accessToken,
  };

  console.log("data", data);

  useEffect(() => {
    props.onVendorGetData(data);
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

    let user = {
      name: values.name,
      mobile: values.mobile,
      location: values.location,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
      role: "customer",
    };
    console.log("Data of Customer:", user);
    props.onPostCustomerData(data, user, toggle);
    setSubmitting(true);
    return;
  };

  console.log("user id", props.login?.login?.user?.id);

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="">
          <strong>User</strong>
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
            Add User
          </Button>
        </div>
        <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add New User</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                email: "",
                mobile: "",
                location: "",
                password: "",
                password_confirmation: "",
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
                          // style={{ color: "whitesmoke" }}
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
                    // style={{ color: "whitesmoke" }}
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
                    // style={{ color: "whitesmoke" }}
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
                    // style={{ color: "whitesmoke" }}
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
                    // style={{ color: "whitesmoke" }}
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
                    // style={{ color: "whitesmoke" }}
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
                    // style={{ color: "whitesmoke" }}
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
                          // style={{ color: "whitesmoke" }}
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
                          // style={{ color: "whitesmoke" }}
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
                        Add User
                      </Button>
                    </div>
                  </div>
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
              <th scope="col">user Id.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Location</th>
              {/* <th scope="col">File</th> */}
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {props.customer?.length > 0 ? (
              props.customer?.map((user, index) => {
                if (user.role == "customer")
                  return (
                    <tr key={index}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>{user.location}</td>
                      <td className="d-flex">
                        <EditCustomer user={user} />
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
    onVendorGetData: (data) => dispatch(actions.vendorGetData(data)),
    onCustomerGetData: (data) => dispatch(actions.customerGetData(data)),
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
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
