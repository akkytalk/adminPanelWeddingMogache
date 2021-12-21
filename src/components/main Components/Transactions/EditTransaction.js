// import { ErrorMessage, Field, Formik, Form } from "formik";
// import React, { useState } from "react";
// import * as Yup from "yup";
// import { connect } from "react-redux";
// import * as actions from "../../../redux/action";

// import {
//   Button,
//   Col,
//   InputGroup,
//   Label,
//   Modal,
//   ModalBody,
//   ModalHeader,
//   Row,
// } from "reactstrap";
// import CustomInput from "../../../views/custom/CustomInput";

// function EditSlots(props) {
//   const accessToken = `${props.login?.login?.success?.token}`;

//   let data = {
//     token: accessToken,
//   };

//   const [modal, setModal] = useState(false);

//   const toggle = () => {
//     setModal(!modal);
//   };
//   const handleSubmit = (values, { setSubmitting }) => {
//     console.log("values in Slot:", values);

//     let user = {
//       id: props.user?.id,
//       user_id: props.login?.login?.user?.id,
//       vendor_id: values.vendor_id,
//       name: values.name,
//     };
//     console.log("Data of Slot:", user);
//     props.onUpdateSlotData(data, user, toggle);
//     setSubmitting(true);
//   };

//   return (
//     <div>
//       <Button
//         className="btn-warning p-1"
//         onClick={() => {
//           toggle();
//         }}
//       >
//         <i className="fa fa-edit" aria-hidden="true"></i>
//       </Button>
//       <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
//         <ModalHeader toggle={toggle}>Edit Slot</ModalHeader>
//         <ModalBody>
//           <Formik
//             initialValues={{
//               name: props.user?.name,
//               vendor_id: props.user?.vendor.id,
//             }}
//             onSubmit={handleSubmit}
//             // validationSchema={Yup.object().shape({
//             //   name: Yup.string().required("Slot Name is required"),
//             // })}
//           >
//             {(formProps) => (
//               <Form>
//                 <Row className="form-group d-flex w-100">
//                   <Col md={6}>
//                     <Label for="discount">Select Slot</Label>
//                     <InputGroup>
//                       <Field
//                         component={CustomInput}
//                         type="text"
//                         name="vendor_id"
//                         id="vendor_id"
//                         placeholder="Select Slot"
//                         list="userdatalist"
//                         className={"form-control"}
//                       />
//                       <datalist id="userdatalist">
//                         {props.vendor?.map((user, index) => {
//                           return (
//                             <option key={index} value={user.id}>
//                               {user.name}
//                             </option>
//                           );
//                         })}
//                       </datalist>
//                     </InputGroup>
//                   </Col>
//                   <Col md={6}>
//                     <Label for="discount">Slot Name</Label>
//                     <InputGroup>
//                       <Field
//                         component={CustomInput}
//                         type="text"
//                         name="name"
//                         id="name"
//                         placeholder="Enter Slot Name"
//                         className={
//                           "form-control" +
//                           (formProps.errors.name && formProps.touched.name
//                             ? " is-invalid"
//                             : "")
//                         }
//                       />

//                       <ErrorMessage
//                         name="name"
//                         component="div"
//                         className="invalid-feedback"
//                       />
//                     </InputGroup>
//                   </Col>
//                 </Row>

//                 <br />
//                 <Row style={{ justifyContent: "center" }}>
//                   <Col md={4}>
//                     <Button type="reset" color="danger" block>
//                       <b>Reset</b>
//                     </Button>
//                   </Col>
//                   <Col md={4}>
//                     <Button
//                       type="submit"
//                       disabled={formProps.isSubmitting}
//                       color="primary"
//                       block
//                     >
//                       Submit
//                     </Button>
//                   </Col>
//                 </Row>
//               </Form>
//             )}
//           </Formik>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// }
// const mapStateToProps = (state) => {
//   return {
//     login: state.login,
//
//     vendor: state.vendor.vendor,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onSlotGetData: (data) => dispatch(actions.slotGetData(data)),
//     onVendorGetData: (data) => dispatch(actions.vendorGetData(data)),
//     onDeleteSlot: (data, id) => dispatch(actions.deleteSlot(data, id)),
//     onPostSlotData: (data, user, toggle) =>
//       dispatch(actions.postSlotData(data, user, toggle)),
//     onUpdateSlotData: (data, user, toggle) =>
//       dispatch(actions.updateSlotData(data, user, toggle)),
//     onEditSlotRow: (
//       data,
//       id,
//       editing,
//       setEditing,
//       currentUser,
//       setCurrentUser
//     ) =>
//       dispatch(
//         actions.editSlotRow(
//           data,
//           id,
//           editing,
//           setEditing,
//           currentUser,
//           setCurrentUser
//         )
//       ),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(EditSlots);
