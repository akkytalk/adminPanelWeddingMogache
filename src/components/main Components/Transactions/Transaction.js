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
import EditTransaction from "./EditTransaction";

function Transaction(props) {
  const accessToken = `${props.login?.login?.token?.token}`;

  let data = {
    token: accessToken,
  };

  console.log("data", data);

  useEffect(() => {
    props.onVendorGetData();
    props.onTransactionGetData();
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
    console.log("values in Transaction:", values);

    let user = {
      user_id: props.login?.login?.user?.id,
      vendor_id: values.vendor_id,
      name: values.name,
    };
    console.log("Data of Transaction:", user);
    props.onPostTransactionData(data, user, toggle);
    setSubmitting(true);
    return;
  };

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="">
          <strong>Transaction</strong>
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
          {/* <Button
            className="btn-success  float-right"
            onClick={() => {
              toggle();
            }}
          >
            Add Transaction
          </Button> */}
        </div>
        <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add New Transaction</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                vendor_id: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Transaction Name is required"),
              })}
            >
              {(formProps) => (
                <Form>
                  <Row className="form-group d-flex w-100">
                    <Col md={6}>
                      <Label for="discount">Select Vendor</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="vendor_id"
                          id="vendor_id"
                          placeholder="Select Vendor"
                          list="userdatalist"
                          className={"form-control"}
                        />
                        <datalist id="userdatalist">
                          {props.vendor.map((user, index) => {
                            return (
                              <option key={index} value={user.id}>
                                {user.name}
                              </option>
                            );
                          })}
                        </datalist>
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Label for="discount">Transaction Name</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter Transaction Name"
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
              <th scope="col">user Id.</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Vendor</th>
              <th scope="col">Vendor Type</th>
              <th scope="col">Booking Amount</th>
              <th scope="col">Advance Amount</th>
              <th scope="col">Booking Date</th>
              <th scope="col">Refenence</th>
              <th scope="col">Remark</th>
              <th scope="col">Morning Status</th>
              <th scope="col">Night Status</th>

              {/* <th scope="col">File</th> */}
              {/* <th scope="col">Action</th> */}
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {props.transaction.length > 0 ? (
              props.transaction
                ?.filter((user) => user.status == 1)
                .map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.user_id}</td>
                      <td>
                        {user.customer_name
                          ? user.customer_name
                          : user.user?.name}
                      </td>
                      <td>{user.user?.email}</td>
                      <td>{user.phone ? user.phone : "Not Entered"}</td>
                      <td>{user.vendor?.name}</td>
                      <td>
                        {user.vendor?.vendor_type
                          ? user.vendor?.vendor_type?.name
                          : "Yet Not Available"}
                      </td>
                      <td>{user.booking_amount}</td>
                      <td>{user.advance_amount}</td>
                      <td>{user.booking_date}</td>
                      <td>{user.reference ? user.reference : "Not Entered"}</td>
                      <td>{user.remarks}</td>
                      <td>
                        {user.morning_status == 1 ? "booked" : "not booked"}
                      </td>
                      <td>
                        {user.night_status == 1 ? "booked" : "not booked"}
                      </td>
                      {/* <td className="d-flex">
                      <EditTransaction user={user} />
                      <Button
                        className="btn-danger ml-3 p-1"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you wish to delete this Transaction?"
                            )
                          )
                            props.onDeleteTransaction(data, user.id);
                        }}
                      >
                        <i
                          className="fa fa-trash-alt "
                          value={user.id}
                          aria-hidden="true"
                        ></i>
                      </Button>
                    </td> */}
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
    transaction: state.transaction.transaction,
    vendor: state.vendor.vendor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onVendorGetData: (data) => dispatch(actions.vendorGetData(data)),
    onTransactionGetData: () => dispatch(actions.transactionGetData()),
    onDeleteTransaction: (data, id) =>
      dispatch(actions.deleteTransaction(data, id)),
    onPostTransactionData: (data, user, toggle) =>
      dispatch(actions.postTransactionData(data, user, toggle)),
    onUpdateTransactionData: (data, user, toggle) =>
      dispatch(actions.updateTransactionData(data, user, toggle)),
    onEditTransactionRow: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.editTransactionRow(
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
export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
