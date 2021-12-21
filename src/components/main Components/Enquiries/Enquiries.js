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
// import EditStore from "./EditStore";

function Enquiries(props) {
  const accessToken = `${props.login?.login?.success?.token}`;

  let data = {
    token: accessToken,
  };

  console.log("data", data);

  useEffect(() => {
    props.onTransactionGetData(data);
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
    console.log("values in Enquiries:", values);

    let user = {
      user_id: props.login?.login?.user?.id,
      name: values.name,
      area: values.area,
    };
    console.log("Data of Enquiries:", user);
    props.onPostTransactionData(data, user, toggle);
    setSubmitting(true);
    return;
  };

  console.log("user id", props.login?.login?.user?.id);

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="">
          <strong>Enquiries</strong>
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
            Add Enquiries
          </Button> */}
        </div>
        <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add New Enquiries</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                area: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Enquiries Name is required"),
              })}
            >
              {(formProps) => (
                <Form>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="discount">Enquiries Name</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          list="userdatalist"
                          name="name"
                          id="name"
                          placeholder="Enter Enquiries Name"
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
                      <Label for="discount">Area</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="area"
                          id="area"
                          placeholder="Enter Area"
                          className={"form-control"}
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
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Vendor</th>
              <th scope="col">Vendor Type</th>
              <th scope="col">Booking Amount</th>
              <th scope="col">Advance Amount</th>
              <th scope="col">Booking Date</th>
              <th scope="col">Refenence</th>
              <th scope="col">Remark</th>
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {props.transaction.length > 0 ? (
              props.transaction?.map((user, index) => {
                if (user.status == 0)
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
                        {user.vendor_type
                          ? user.vendor_type?.name
                          : "Yet Not Available"}
                      </td>
                      <td>{user.booking_amount}</td>
                      <td>{user.advance_amount}</td>
                      <td>{user.booking_date}</td>
                      <td>{user.reference ? user.reference : "Not Entered"}</td>
                      <td>{user.remarks}</td>
                      <td>{user.total_amt}</td>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTransactionGetData: (data) => dispatch(actions.transactionGetData(data)),
    onDeleteTransaction: (data, id) =>
      dispatch(actions.deleteTransaction(data, id)),
    onPostTransactionData: (data, user, toggle) =>
      dispatch(actions.postTransactionData(data, user, toggle)),
    onUpdateTransactionData: (data, id, user) =>
      dispatch(actions.updateTransactionData(data, id, user)),
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
export default connect(mapStateToProps, mapDispatchToProps)(Enquiries);
