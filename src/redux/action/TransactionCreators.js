import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const transactionSetData = (transaction) => {
  return {
    type: actionType.TRANSACTION_SET_DATA,
    transaction: transaction,
  };
};

export const transactionFailData = () => {
  return {
    type: actionType.TRANSACTION_FAIL_DATA,
  };
};

export const transactionGetData = (data) => {
  return (dispatch) => {
    console.log(data);
    axios
      .get(baseUrl + "transactions")
      .then((res) => {
        dispatch(transactionSetData(res.data));

        console.log("response data", res.data);
      })
      .catch((err) => console.log(err));
    //   .catch((error) => dispatch(transactionFailData()));
  };
};

export const deleteTransactionFail = () => {
  return {
    type: actionType.DELETE_TRANSACTION_FAIL,
  };
};

export const deleteTransaction = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `transactions/${id}`)
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Transaction!").then(() => {
            dispatch(transactionGetData(data));
          });
        })
        .catch((error) => dispatch(deleteTransactionFail()));
    }
  };
};

export const postTransactionDataStart = () => {
  return {
    type: actionType.POST_TRANSACTION_DATA_START,
  };
};

export const postTransactionDataFail = () => {
  return {
    type: actionType.POST_TRANSACTION_DATA_FAIL,
  };
};

export const postTransactionData = (data, user, toggle) => {
  return (dispatch) => {
    // if (!user.name) return;
    // console.log("postTransactionData", data);
    dispatch(postTransactionDataStart());

    axios
      .post(baseUrl + "transactions", user)
      .then(() => {
        console.log("swal");
        swal("Successfully Created Transaction!").then(() => {
          dispatch(transactionGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postTransactionDataFail());
      });
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editTransactionRowStart = () => {
  return {
    type: actionType.EDIT_TRANSACTION_ROW_START,
  };
};

export const failEditTransaction = () => {
  return {
    type: actionType.FAIL_EDIT_TRANSACTION,
  };
};

export const editTransactionRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editTransactionRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `transactions/${id}`)
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
      .catch((error) => dispatch(failEditTransaction()));
  };
};

export const updateTransactionDataStart = () => {
  return {
    type: actionType.UPDATE_TRANSACTION_DATA_START,
  };
};

export const updateTransactionData = (data, id, user) => {
  return (dispatch) => {
    dispatch(updateTransactionDataStart());

    let currentUser = {
      slot_id: user.slot_id,
      store_id: user.store_id,
      user_id: user.user_id,
      enquiry_status: 1,
      payment_status: 1,
      book_apt_date: Date().toLocaleString(),
    };
    console.log("currentUser", currentUser);
    axios
      .put(baseUrl + `transactions/${id}`, currentUser, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Transaction!").then(() => {
          dispatch(transactionGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
