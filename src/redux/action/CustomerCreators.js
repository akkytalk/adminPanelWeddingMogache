import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const customerSetData = (customer) => {
  return {
    type: actionType.CUSTOMER_SET_DATA,
    customer: customer,
  };
};

export const customerFailData = () => {
  return {
    type: actionType.CUSTOMER_FAIL_DATA,
  };
};

export const customerGetData = (data) => {
  return (dispatch) => {
    console.log(data);
    axios
      .get(baseUrl + "users", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(customerSetData(res.data));

        console.log("response data", res.data);
      })
      .catch((err) => console.log(err));
    //   .catch((error) => dispatch(customerFailData()));
  };
};

export const deleteCustomerFail = () => {
  return {
    type: actionType.DELETE_CUSTOMER_FAIL,
  };
};

export const deleteCustomer = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `users/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Customer!").then(() => {
            dispatch(customerGetData(data));
          });
        })
        .catch((error) => dispatch(deleteCustomerFail()));
    }
  };
};

export const postCustomerDataStart = () => {
  return {
    type: actionType.POST_CUSTOMER_DATA_START,
  };
};

export const postCustomerDataFail = () => {
  return {
    type: actionType.POST_CUSTOMER_DATA_FAIL,
  };
};

export const postCustomerData = (data, user, toggle) => {
  return (dispatch) => {
    // if (!user.name) return;
    // console.log("postCustomerData", data);
    dispatch(postCustomerDataStart());

    axios
      .post(baseUrl + "users", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Customer!").then(() => {
          dispatch(customerGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postCustomerDataFail());
      });
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editCustomerRowStart = () => {
  return {
    type: actionType.EDIT_CUSTOMER_ROW_START,
  };
};

export const failEditCustomer = () => {
  return {
    type: actionType.FAIL_EDIT_CUSTOMER,
  };
};

export const editCustomerRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editCustomerRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `users/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "editing data res");
        setEditing(res.data);
        setCurrentUser({
          id: res.data.id,
          assesement_id: res.data.assesement_id,
          asses_name: res.data.assesement.name,
          name: res.data.name,
        });
      })
      .catch((error) => dispatch(failEditCustomer()));
  };
};

export const updateCustomerDataStart = () => {
  return {
    type: actionType.UPDATE_CUSTOMER_DATA_START,
  };
};

export const updateCustomerData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(updateCustomerDataStart());

    axios
      .post(baseUrl + `users/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Customer!").then(() => {
          toggle();
          dispatch(customerGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
