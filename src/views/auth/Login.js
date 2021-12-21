// import React, { Component } from "react";
// import authbg from "../../assets/images/background/login-register.jpg";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { Link } from "react-router-dom";
// import CustomInput from "../custom/CustomInput";
// import * as Yup from "yup";
// import { Button, Card, CardBody } from "reactstrap";
// import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";
// import { postLogin } from "../../redux/services/Login";

// const mapStateToProps = (state) => {
//   return {
//     login: state.login,
//     signup: state.signup,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   postLogin: (data) => {
//     dispatch(postLogin(data));
//   },
// });

// class Login extends Component {
//   handleSubmit = (values, { props = this.props, setSubmitting }) => {
//     let data = {
//       email: values.email,
//       password: values.password,
//     };
//     this.props.postLogin(data);
//     setSubmitting(true);
//     return;
//   };
//   render() {
//     // if (this.props.login?.login.length !== 0) {
//     //   return <Redirect to={"/"} />;
//     // } else if (this.props.login?.isLoading) {
//     //   //Spinner when service data sending under processing
//     //   return (
//     //     <div
//     //       className="col-xs-12 col-sm-12 col-md-5 col-lg-4"
//     //       style={{
//     //         position: "absolute",
//     //         left: "50%",
//     //         top: "50%",
//     //         transform: "translate(-50%, -50%)",
//     //       }}
//     //     >
//     //       <Card className="p-5">
//     //         <CardBody>
//     //           <div
//     //             className="spinner-grow text-success col-xs-12 col-sm-12 col-md-5 col-lg-4"
//     //             style={{
//     //               width: "3rem",
//     //               height: "3rem",
//     //               position: "absolute",
//     //               left: "50%",
//     //               top: "50%",
//     //               transform: "translate(-50%, -50%)",
//     //             }}
//     //             role="status"
//     //           >
//     //             <span className="sr-only">Loading...</span>
//     //           </div>
//     //         </CardBody>
//     //       </Card>
//     //     </div>
//     //   );
//     // }

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
//                   <h3 className="font-medium mb-3">Sign In</h3>
//                   <Formik
//                     initialValues={{
//                       email: "",
//                       password: "",
//                     }}
//                     onSubmit={this.handleSubmit}
//                     validationSchema={Yup.object().shape({
//                       email: Yup.string()
//                         .required("Enter Your Email")
//                         .email("Invalid Email address"),
//                       password: Yup.string().required("Enter Your Password"),
//                     })}
//                   >
//                     {(formProps) => (
//                       <Form className="mt-3">
//                         <label htmlFor="email" className="font-medium">
//                           Email
//                         </label>
//                         <div className="mb-2 input-group">
//                           <div className="input-group-prepend">
//                             <span className="input-group-text">
//                               <i className="ti-user" />
//                             </span>
//                           </div>
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
//                             className="invalid-feedback text-center"
//                           />
//                         </div>
//                         <label htmlFor="email" className="mt-3 font-medium">
//                           Password
//                         </label>
//                         <div className="mb-2 input-group">
//                           <div className="input-group-prepend">
//                             <span className="input-group-text">
//                               <i className="ti-pencil" />
//                             </span>
//                           </div>
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
//                             className="invalid-feedback text-center"
//                           />
//                         </div>
//                         <div className="mt-3 mb-3 row">
//                           <div className="col-12">
//                             <Button
//                               type="submit"
//                               disabled={formProps.isSubmitting}
//                               color="primary"
//                               size="lg"
//                               block
//                             >
//                               Log In
//                             </Button>
//                           </div>
//                         </div>
//                       </Form>
//                     )}
//                   </Formik>
//                   <div>
//                     New User? <Link to="/register">Sign Up</Link> Now.
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

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
