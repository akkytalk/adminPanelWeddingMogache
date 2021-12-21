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
import CustomSelect from "../../../views/custom/CustomSelect";

import EditVendorType from "./EditVendorType";

function VendorType(props) {
  useEffect(() => {
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
    console.log("values in Type:", values);

    const user = new FormData();

    user.append("name", values.name);
    user.append("image", values.image_url);
    console.log("Data of Type:", user);
    props.onPostVendorTypeData(user, toggle);
    setSubmitting(true);
    return;
  };

  // console.log("user id", props.login?.login?.user?.id);

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="">
          <strong>Vendor Type</strong>

          <Button
            className="btn-success  float-right"
            onClick={() => {
              toggle();
            }}
          >
            Add Vendor Type
          </Button>
        </div>
        <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add New Vendor Type</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                image_url: null,
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Vendor Type Name is required"),
              })}
            >
              {(formProps) => (
                <Form>
                  <Row className="form-group">
                    <Col md={6}>
                      <Label for="discount">Vendor Type Name</Label>
                      <InputGroup>
                        <Field
                          component={CustomInput}
                          type="text"
                          list="userdatalist"
                          name="name"
                          id="name"
                          placeholder="Enter Vendor Type Name"
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
                      <Label for="discount">Select Image</Label>
                      <FormGroup>
                        <InputGroup>
                          <input
                            component={CustomSelect}
                            type="file"
                            name="image_url"
                            id="image_url"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "image_url",
                                event.currentTarget.files[0]
                              );
                            }}
                            className="form-group"
                          />
                        </InputGroup>
                      </FormGroup>
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
              <th scope="col">Image</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody style={{ textTransform: "uppercase" }}>
            {props.vendortype.length > 0 ? (
              props.vendortype?.map((user, index) => {
                return (
                  <tr key={index}>
                    {/* <td>{user.user_id}</td> */}
                    <td>{user.name}</td>
                    <td>
                      <a
                        href={`https://uditsolutions.in/mogachetest/storage/app/public/images/${user.image_url}`}
                        alt=""
                        target={"_blank"}
                      >
                        {user.image_url}
                      </a>
                    </td>

                    <td className="d-flex">
                      <EditVendorType data={user} />
                      <Button
                        className="btn-danger ml-3 p-1"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you wish to delete this Vendor Type?"
                            )
                          )
                            props.onDeleteVendorType(user.id);
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
    vendortype: state.vendortype.vendortype,
    vendor: state.vendor.vendor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onVendorGetData: () => dispatch(actions.vendorGetData()),

    onVendorTypeGetData: () => dispatch(actions.vendortypeGetData()),
    onDeleteVendorType: (id) => dispatch(actions.deleteVendortype(id)),
    onPostVendorTypeData: (user, toggle) =>
      dispatch(actions.postVendortypeData(user, toggle)),
    onUpdateVendorTypeData: (id) => dispatch(actions.updateVendortypeData(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VendorType);
