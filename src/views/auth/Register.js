// import React, { Component } from "react";
// import authbg from "../../assets/images/background/login-register.jpg";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Link } from "react-router-dom";
// import CustomInput from "../custom/CustomInput";
// import CustomSelect from "../custom/CustomSelect";
// import { InputGroup, InputGroupAddon, Button } from "reactstrap";

// class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   handleSubmit = (values, { props = this.props, setSubmitting }) => {
//     let data = {
//       email: values.email,
//       password: values.password,
//     };
//     console.log(data);
//     setSubmitting(true);
//     return;
//   };

//   render() {
//     return (
//       <div
//         style={{
//           width: "100vw",
//           height: "100vh",
//           backgroundImage: `url(${authbg})`,
//           backgroundPosition: "center",
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         <div className="auth-wrapper align-items-center">
//           <div className="container" style={{ paddingTop: 35 }}>
//             <div className="no-gutters justify-content-center row">
//               <div className="bg-white col-md-6 col-lg-4">
//                 <div className="p-4">
//                   <h3 className="font-medium mb-3">Sign Up</h3>
//                   <Formik
//                     initialValues={{
//                       email: "",
//                       password: "",
//                       c_password: "",
//                       firstname: "",
//                       lastname: "",
//                     }}
//                     onSubmit={this.handleSubmit}
//                     validationSchema={Yup.object().shape({
//                       email: Yup.string().required("Enter Your Email"),
//                       password: Yup.string().required("Enter Your Password"),
//                     })}
//                   >
//                     {(formProps) => (
//                       <Form className="mt-3">
//                         <label htmlFor="email" className="font-medium">
//                           Email
//                         </label>
//                         <InputGroup>
//                           <InputGroupAddon addonType="prepend">
//                             <span className="input-group-text">
//                               <i className="ti-user" />
//                             </span>
//                           </InputGroupAddon>
//                           <Field
//                             component={CustomInput}
//                             type="text"
//                             name="email"
//                             id="email"
//                             className={
//                               "form-control" +
//                               (formProps.errors.email && formProps.touched.email
//                                 ? " is-invalid"
//                                 : "")
//                             }
//                             placeholder="yourname@company.com"
//                           />
//                           <ErrorMessage
//                             name="email"
//                             component="div"
//                             className="invalid-feedback"
//                           />
//                         </InputGroup>
//                         <label htmlFor="email" className="mt-3 font-medium">
//                           Password
//                         </label>
//                         <InputGroup>
//                           <InputGroupAddon addonType="prepend">
//                             <span className="input-group-text">
//                               <i className="ti-pencil" />
//                             </span>
//                           </InputGroupAddon>
//                           <Field
//                             component={CustomInput}
//                             type="password"
//                             name="password"
//                             id="password"
//                             className={
//                               "form-control" +
//                               (formProps.errors.password &&
//                               formProps.touched.password
//                                 ? " is-invalid"
//                                 : "")
//                             }
//                             placeholder="* * * * * *"
//                           />
//                           <ErrorMessage
//                             name="password"
//                             component="div"
//                             className="invalid-feedback"
//                           />
//                         </InputGroup>
//                         <label htmlFor="firstname" className="mt-3 font-medium">
//                           First Name
//                         </label>
//                         <InputGroup>
//                           <InputGroupAddon addonType="prepend">
//                             <span className="input-group-text">
//                               <i className="ti-user" />
//                             </span>
//                           </InputGroupAddon>
//                           <Field
//                             component={CustomInput}
//                             type="text"
//                             name="firstname"
//                             id="firstname"
//                             placeholder="Enter First Name"
//                           />
//                         </InputGroup>
//                         <label htmlFor="lastname" className="mt-3 font-medium">
//                           Last Name
//                         </label>
//                         <InputGroup>
//                           <InputGroupAddon addonType="prepend">
//                             <span className="input-group-text">
//                               <i className="ti-user" />
//                             </span>
//                           </InputGroupAddon>
//                           <Field
//                             component={CustomInput}
//                             type="text"
//                             name="lastname"
//                             id="lastname"
//                             placeholder="Enter Last Name"
//                           />
//                         </InputGroup>
//                         <label htmlFor="type" className="mt-3 font-medium">
//                           Register As
//                         </label>
//                         <InputGroup>
//                           <InputGroupAddon addonType="prepend">
//                             <span className="input-group-text">
//                               <i className="ti-user" />
//                             </span>
//                           </InputGroupAddon>
//                           <Field component={CustomSelect} name="type" id="type">
//                             <option hidden>Select Type</option>
//                             <option disabled>Select Type</option>
//                             <option selected>User</option>
//                             <option>Transporter</option>
//                           </Field>
//                         </InputGroup>
//                         <div className="mt-3 mb-3 row">
//                           <div className="col-12">
//                             <Button
//                               type="submit"
//                               disabled={formProps.isSubmitting}
//                               color="primary"
//                               size="lg"
//                               block
//                             >
//                               Sign Up
//                             </Button>
//                           </div>
//                         </div>
//                       </Form>
//                     )}
//                   </Formik>

//                   <div>
//                     Already have an account? <Link to="/login">Login</Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Register;
