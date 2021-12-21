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
import EditCategory from "./EditCategory";

// import EditVendor from "./EditVendor";

function Category(props) {
  const accessToken = `${props.login?.login?.token}`;

  let data = {
    token: accessToken,
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
    props.onPostCategoryData(data, user, toggle);
    setSubmitting(true);
    return;
  };

  // console.log("user id", props.login?.login?.user?.id);

  return (
    <Card>
      <CardHeader className="bg-warning text-white">
        <div className="">
          <strong>Category</strong>

          <Button
            className="btn-success  float-right"
            onClick={() => {
              toggle();
            }}
          >
            Add Category
          </Button>
        </div>
        <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add New Category</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                image: null,
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
                          list="userdatalist"
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
            {props.category.length > 0 ? (
              props.category?.map((user, index) => {
                return (
                  <tr key={index}>
                    {/* <td>{user.user_id}</td> */}
                    <td>{user.name}</td>
                    <td>{user.image}</td>

                    <td className="d-flex">
                      <EditCategory data={user} />
                      <Button
                        className="btn-danger ml-3 p-1"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you wish to delete this Category?"
                            )
                          )
                            props.onDeleteCategory(data, user.id);
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
    onUpdateCategoryData: (data, id) =>
      dispatch(actions.updateCategoryData(data, id)),
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
export default connect(mapStateToProps, mapDispatchToProps)(Category);
