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

// import EditVendor from "./EditVendor";

function EditCategory(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
    id: props.data?.id,
  };

  console.log("data", data);

  useEffect(() => {
    props.onCategoryGetData(data);
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
    console.log("values in Category:", values);

    const user = new FormData();

    user.append("name", values.name);
    user.append("image", values.image);
    console.log("Data of Category:", user);
    props.onUpdateCategoryData(data, user, toggle);
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
        <ModalHeader toggle={toggle}>Edit Category</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: props.data ? props.data.name : "",
              image: props.data ? props.data.image : "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Category Name is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row className="form-group">
                  <Col md={6}>
                    <Label for="discount">Category Name</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Category Name"
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
                            href={`https://uditsolutions.in/astrowars/storage/app/public/categories/${props?.data?.image}`}
                          >
                            {props.data.image}
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
    onVendorGetData: (data) => dispatch(actions.vendorGetData(data)),

    onCategoryGetData: (data) => dispatch(actions.categoryGetData(data)),
    onDeleteCategory: (data, id) => dispatch(actions.deleteCategory(data, id)),
    onPostCategoryData: (data, user, toggle) =>
      dispatch(actions.postCategoryData(data, user, toggle)),
    onUpdateCategoryData: (data, user, toggle) =>
      dispatch(actions.updateCategoryData(data, user, toggle)),
    onEditCategoryRow: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.editCategoryRow(
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
export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);
