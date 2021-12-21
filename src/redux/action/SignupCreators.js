import { baseUrl } from "../../shared/baseUrl";
import { toast } from "react-toastify";
import { addLogin, loginFailed, loginLoading } from "./LoginCreators";
import axios from "../../axios";

const myheader = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json",
});

export const postSignup = (data) => (dispatch) => {
  dispatch(loginLoading(true));
  console.log(data, myheader);

  axios
    .post("/userRegister", data)
    .then((res) => {
      console.log("is this token??", res.data);
      // localStorage.setItem("authToken", res.data.success.token);
      console.log("swal");
      dispatch(addLogin(res.data));
      // swal("Successfully logged in!");
    })
    .catch((error) => dispatch(loginFailed(error)));
  // return fetch(baseUrl + "register", {
  //   method: "post",
  //   headers: myheader,
  //   body: JSON.stringify(data),
  // })
  //   .then((response) => {
  //     console.log(response);
  //     if (response.ok) {
  //       return response;
  //     }
  //     let error = new Error(
  //       "Error:" + response.status + " " + response.statusText
  //     );
  //     error.response = response;
  //     throw error;
  //   })
  //   .then((response) => response.json())
  //   .then((signup) => {
  //     console.log(signup);
  //     if (signup.error) {
  //       toast.error("UnAuthorized");
  //       dispatch(loginFailed(signup.error));
  //     } else {
  //       toast.success("Signup Successfull!");
  //       dispatch(addLogin(signup));
  //     }
  //   })
  //   .catch((error) => {
  //     dispatch(loginFailed(error));
  //   });
};
