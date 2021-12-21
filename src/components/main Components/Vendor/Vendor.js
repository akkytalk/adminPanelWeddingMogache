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
import EditVendor from "./EditVendor";
import CustomSelect from "../../../views/custom/CustomSelect";

function Vendor(props) {
  useEffect(() => {
    props.onVendorGetData();

    props.onVendorTypeGetData();
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
    console.log("values in Vendor:", values);

    let data = {
      name: values.name,
      email: values.email,
      vendor_type_name: values.vendor_type_name,
      address: values.address,
      USP: values.USP,
      events_completed: values.events_completed,
      years_of_experience: values.years_of_experience,
      mobile: values.mobile,
      password: values.password,
      password_confirmation: values.password_confirmation,
      Taxes: values.taxes,
      status: values.status,
      remarks: values.remarks,
      about: values.about,
      summary: values.summary,
      terms_conditions: values.terms_conditions,
      booking_policy: values.booking_policy,
      cancellation_policy: values.cancellation_policy,
    };
    props.onPostVendorData(data, toggle);
    setSubmitting(true);
    return;
  };

  // console.log("user id", props.login?.login?.user?.id);

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="">
          <strong>Vendor</strong>
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
            Add Vendor
          </Button>
        </div>
        <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add New Vendor</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                email: "",
                vendor_type_name: "",
                address: "",
                password: "",
                password_confirmation: "",
                USP: "",
                events_completed: "",
                years_of_experience: "",
                mobile: "",
                taxes: "",
                status: "",
                remarks: "",
                about: "",
                summary: "",
                terms_conditions: "",
                booking_policy: "",
                cancellation_policy: "",
              }}
              onSubmit={handleSubmit}
            >
              {(formProps) => (
                <Form className="">
                  <fieldset>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                        {/* Text input*/}
                        <FormGroup className="form-group mylistingitems">
                          <InputGroup className="mylistingitems">
                            <InputGroupAddon addonType="prepend">
                              <label htmlFor="login-email">Vendor Name</label>
                            </InputGroupAddon>
                            <Field
                              id="name"
                              type="text"
                              name="name"
                              //value={vendor.name}
                              // onchange={handleInputChange}
                              placeholder="Vendor Name"
                              className="form-control w-100"
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                        {/* Text input*/}
                        <FormGroup className="form-group">
                          <InputGroup className="mylistingitems">
                            <InputGroupAddon addonType="prepend">
                              <label>E-mail</label>
                            </InputGroupAddon>
                            <Field
                              id="email"
                              type="text"
                              name="email"
                              //value={vendor.email}
                              //onchange={handleInputChange}
                              placeholder="Enter Email"
                              className="form-control w-100"
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                        {/* Text input*/}
                        <FormGroup className="form-group">
                          <InputGroup className="mylistingitems">
                            <InputGroupAddon addonType="prepend">
                              <label>Vendor Purpose</label>
                            </InputGroupAddon>
                            <Field
                              id="vendor_type_name"
                              type="select"
                              component={CustomSelect}
                              name="vendor_type_name"
                              placeholder="Vendor Purpose"
                              className="form-control w-100"
                            >
                              <option>Select Vendor type</option>
                              {props.vendortype
                                .filter((type) => type.name !== "venue")
                                .map((type) => (
                                  <option value={type.name}>{type.name}</option>
                                ))}
                            </Field>
                          </InputGroup>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                        {/* Text input*/}
                        <FormGroup className="form-group service-form-group">
                          <InputGroup className="mylistingitems">
                            <InputGroupAddon addonType="prepend">
                              <label>City Name</label>
                            </InputGroupAddon>
                            <Field
                              id="address"
                              type="text"
                              name="address"
                              // value={vendor.address}
                              placeholder="Name of City"
                              className="form-control w-100"
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                        {/* Text input*/}
                        <FormGroup className="form-group service-form-group">
                          <InputGroupAddon addonType="prepend">
                            <label>Password</label>
                          </InputGroupAddon>
                          <InputGroup>
                            <Field
                              id="password"
                              type="password"
                              name="password"
                              placeholder="Password"
                              className="form-control"
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                        {/* Text input*/}
                        <FormGroup className="form-group service-form-group">
                          <InputGroupAddon addonType="prepend">
                            <label>Confirm Password</label>
                          </InputGroupAddon>
                          <InputGroup>
                            <Field
                              id="password_confirmation"
                              type="password"
                              name="password_confirmation"
                              placeholder="Confirm Password"
                              className="form-control"
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                        {/* Text input*/}
                        <FormGroup className="form-group service-form-group">
                          <InputGroup className="mylistingitems">
                            <InputGroupAddon addonType="prepend">
                              <label>USP (unique selling point)</label>
                            </InputGroupAddon>
                            <Field
                              id="USP"
                              type="text"
                              name="USP"
                              //  value={vendor.USP}
                              placeholder="USP(unique selling point)"
                              className="form-control w-100"
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                        {/* Text input*/}
                        <FormGroup className="form-group service-form-group">
                          <InputGroup className="mylistingitems">
                            <InputGroupAddon addonType="prepend">
                              <label>Event Completed</label>
                            </InputGroupAddon>
                            <Field
                              id="events_completed"
                              type="number"
                              name="events_completed"
                              // value={vendor.events_completed}
                              placeholder="Event Completed"
                              className="form-control w-100"
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                        {/* Text input*/}
                        <FormGroup className="form-group service-form-group">
                          <InputGroup className="mylistingitems">
                            <InputGroupAddon addonType="prepend">
                              <label>Years of Experience </label>
                            </InputGroupAddon>
                            <Field
                              id="years_of_experience"
                              type="number"
                              name="years_of_experience"
                              //  value={vendor.time}
                              placeholder="Years of Experience"
                              className="form-control w-100"
                              // required
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                        {/* Text input*/}
                        <FormGroup className="form-group service-form-group">
                          <InputGroup className="mylistingitems">
                            <InputGroupAddon addonType="prepend">
                              <label>Mobile No</label>
                            </InputGroupAddon>
                            <Field
                              id="mobile"
                              type="number"
                              name="mobile"
                              // value={vendor.mobile}
                              placeholder="Mobile No"
                              className="form-control w-100"
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                        {/* Text input*/}
                        <FormGroup className="form-group service-form-group">
                          <InputGroup className="mylistingitems">
                            <InputGroupAddon addonType="prepend">
                              <label>Taxes</label>
                            </InputGroupAddon>
                            <Field
                              id="taxes"
                              type="text"
                              name="taxes"
                              // value={vendor.taxes}
                              placeholder="Taxes"
                              className="form-control w-100"
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                        {/* Text input*/}
                        <FormGroup className="form-group service-form-group">
                          <InputGroup className="mylistingitems">
                            <InputGroupAddon addonType="prepend">
                              <label>Status</label>
                            </InputGroupAddon>
                            <Field
                              id="status"
                              as="select"
                              name="status"
                              // value={vendor.status}
                              placeholder="Status"
                              className="form-control w-100"
                              required
                            >
                              <option value={0}>inactive</option>
                              <option value={1}>active</option>
                            </Field>
                          </InputGroup>
                        </FormGroup>
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                        {/* Text input*/}
                        <FormGroup className="form-group service-form-group">
                          <InputGroup className="mylistingitems">
                            <InputGroupAddon addonType="prepend">
                              <label>Remarks</label>
                            </InputGroupAddon>
                            <Field
                              id="remarks"
                              type="text"
                              as="textarea"
                              name="remarks"
                              // value={vendor.remarks}
                              placeholder="Remarks"
                              className="form-control w-100"
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                        {/* Text input*/}
                        <FormGroup className="form-group service-form-group">
                          <InputGroup className="mylistingitems">
                            <InputGroupAddon addonType="prepend">
                              <label>About</label>
                            </InputGroupAddon>
                            <Field
                              id="about"
                              type="text"
                              as="textarea"
                              // value={vendor.about}
                              name="about"
                              placeholder="Tell us More about you"
                              className="form-control w-100"
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                        {/* Text input*/}
                        <FormGroup className="form-group service-form-group">
                          <InputGroup className="mylistingitems">
                            <InputGroupAddon addonType="prepend">
                              <label>Summary</label>
                            </InputGroupAddon>
                            <Field
                              id="summary"
                              type="text"
                              as="textarea"
                              // value={vendor.summary}
                              name="summary"
                              placeholder="Enter Summary of Lodging, Area available (there can 2 two halls in one venue), Keywords as per area & location, Other Policies"
                              className="form-control w-100"
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                        {/* Text input*/}
                        <FormGroup className="form-group service-form-group">
                          <InputGroup className="mylistingitems">
                            <InputGroupAddon addonType="prepend">
                              <label>terms & conditions</label>
                            </InputGroupAddon>
                            <Field
                              id="terms_conditions"
                              type="text"
                              as="textarea"
                              name="terms_conditions"
                              //  value={vendor.terms_conditions}
                              placeholder="Enter terms & conditions"
                              className="form-control w-100"
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                        {/* Text input*/}
                        <FormGroup className="form-group service-form-group">
                          <InputGroup className="mylistingitems">
                            <InputGroupAddon addonType="prepend">
                              <label>Booking Policy</label>
                            </InputGroupAddon>
                            <Field
                              id="booking_policy"
                              type="text"
                              as="textarea"
                              name="booking_policy"
                              //  value={vendor.booking_policy}
                              placeholder="Enter booking policy"
                              className="form-control w-100"
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                        {/* Text input*/}
                        <FormGroup className="form-group service-form-group">
                          <InputGroup className="mylistingitems">
                            <InputGroupAddon addonType="prepend">
                              <label>Cancellation Policy</label>
                            </InputGroupAddon>
                            <Field
                              id="cancellation_policy"
                              type="text"
                              as="textarea"
                              name="cancellation_policy"
                              placeholder="Enter cancellation policy"
                              className="form-control w-100"
                            />
                          </InputGroup>
                        </FormGroup>
                      </div>

                      {/* buttons */}
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-center">
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
                      </div>
                    </div>
                  </fieldset>
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
              <th scope="col">Vendor Type</th>
              <th scope="col">Address</th>
              <th scope="col">Phone</th>
              <th scope="col">Rating</th>
              <th scope="col">Available status</th>
              {/* <th scope="col">File</th> */}
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {props.vendor.length > 0 ? (
              props.vendor
                ?.filter((user) => user.vendor_type_id !== "10")
                .map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.vendor_type?.name}</td>
                      <td>{user.address}</td>
                      <td>{user.mobile}</td>
                      <td>{user.rating}</td>
                      <td>
                        {user.status == 1 ? "Available" : "Not Available"}
                      </td>

                      <td className="d-flex">
                        <EditVendor vendor={user} />
                        <Button
                          className="btn-danger ml-3 p-1"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this Vendor?"
                              )
                            )
                              props.onDeleteVendor(data, user.id);
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
    vendor: state.vendor.vendor,
    vendortype: state.vendortype.vendortype,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onVendorGetData: () => dispatch(actions.vendorGetData()),
    onVendorTypeGetData: () => dispatch(actions.vendortypeGetData()),

    onDeleteVendor: (id) => dispatch(actions.deleteVendor(id)),
    onPostVendorData: (user, toggle) =>
      dispatch(actions.postVendorData(user, toggle)),
    onUpdateVendorData: (user, toggle) =>
      dispatch(actions.updateVendorData(user, toggle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Vendor);