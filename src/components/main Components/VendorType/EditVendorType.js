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
import CustomSelect from "../../../views/custom/CustomSelect";

// import EditVendor from "./EditVendor";

function EditVendorType(props) {
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
    console.log("values in VendorType:", values);

    const user = new FormData();
    const id = props.data?.id;
    user.append("name", values.name);
    user.append("image", values.image_url);
    console.log("Data of VendorType:", user);
    props.onUpdateVendorTypeData(id, user, toggle);
    setSubmitting(true);
    return;
  };

  console.log("data", props.data);

  return (
    <>
      <Button
        className="btn-warning p-1"
        onClick={() => {
          toggle();
        }}
      >
        <i className="fa fa-edit" aria-hidden="true"></i>
      </Button>
      <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Vendor Type</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: props.data ? props.data.name : "",
              image_url: props.data ? props.data.image_url : "",
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
                      {props?.data?.image_url == "nofile.pdf" ? (
                        <InputGroup>
                          <input
                            type="file"
                            name="image_url"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "image_url",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                        </InputGroup>
                      ) : (
                        <InputGroup>
                          <a
                            target={"_blank"}
                            href={`https://uditsolutions.in/mogachetest/storage/app/public/images/${props.data.image_url}`}
                          >
                            {props.data.image_url}
                          </a>
                          <input
                            type="file"
                            name="image_url"
                            onChange={(event) => {
                              formProps.setFieldValue(
                                "image_url",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                        </InputGroup>
                      )}
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
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    category: state.category.category,
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
    onUpdateVendorTypeData: (id, user, toggle) =>
      dispatch(actions.updateVendortypeData(id, user, toggle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditVendorType);
