import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../../shared/baseUrl";
import { toast } from "react-toastify";
//import axios from "../../axios";
//import swal from "sweetalert";

const myheader = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json",
});

// export const postLogin = (data) => {
//   return (dispatch) => {
//     dispatch(loginLoading(true));
//     axios
//       .post("userLogin", data, {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       })
//       .then((login) => {
//         console.log(login);
//         dispatch(addLogin(login));
//         window.location.reload();
//       })
//       .catch((error) => dispatch(loginFailed(error)));
//   };
// };

export const postLogin = (data) => (dispatch) => {
  dispatch(loginLoading(true));
  console.log(data, myheader);
  return fetch(baseUrl + "userLogin", {
    method: "post",
    headers: myheader,
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + " " + response.statusText
      );
      error.response = response;
      throw error;
    })
    .then((response) => response.json())
    .then((login) => {
      console.log(login);
      if (login.error) {
        toast.error("UnAuthorized");
        dispatch(loginFailed(login.error));
      } else {
        toast.success("Login Successfull!");
        dispatch(addLogin(login));
        window.location.reload();
      }
    })
    .catch((error) => {
      dispatch(loginFailed(error));
    });
};

export const addLogin = (login) => ({
  type: ActionTypes.ADD_LOGIN,
  login: login,
});

export const loginLoading = () => ({
  type: ActionTypes.LOGIN_LOADING,
});

export const loginFailed = (errMess) => ({
  type: ActionTypes.LOGIN_FAILED,
  payload: errMess,
});

export const removeLogin = () => ({
  type: ActionTypes.REMOVE_LOGIN,
  login: [],
});
