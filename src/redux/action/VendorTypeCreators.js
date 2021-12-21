import * as actionType from "./ActionTypes";
import axios from "../../axios";
import swal from "sweetalert";

export const vendortypeSetData = (vendortype) => {
  return {
    type: actionType.VENDORTYPE_SET_DATA,
    vendortype: vendortype,
  };
};

export const vendortypeFailData = (error) => {
  return {
    type: actionType.VENDORTYPE_FAIL_DATA,
    error: error,
  };
};

export const vendortypeGetData = () => {
  return (dispatch) => {
    axios
      .get("vendortypes")
      .then((res) => {
        console.log(res.data, "res");
        dispatch(vendortypeSetData(res.data));
      })

      .catch((error) => dispatch(vendortypeFailData(error)));
  };
};

export const deleteVendortypeFail = (error) => {
  return {
    type: actionType.DELETE_VENDORTYPE_FAIL,
    error: error,
  };
};

export const deleteVendortype = (id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(`vendortypes/${id}`)
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Vendor Type!").then(() => {
            dispatch(vendortypeGetData());
          });
        })
        .catch((error) => dispatch(deleteVendortypeFail(error)));
    }
  };
};

export const postVendortypeDataStart = () => {
  return {
    type: actionType.POST_VENDORTYPE_DATA_START,
  };
};

export const postVendortypeDataFail = (error) => {
  return {
    type: actionType.POST_VENDORTYPE_DATA_FAIL,
    error: error,
  };
};

export const postVendortypeData = (user, toggle) => {
  return (dispatch) => {
    dispatch(postVendortypeDataStart());
    axios
      .post("vendortypes", user)
      .then(() => {
        console.log("swal");
        swal("Successfully Created Vendor Type!").then(() => {
          dispatch(vendortypeGetData());
          toggle();
        });
      })
      .catch((error) => dispatch(postVendortypeDataFail(error)));
  };
};

export const editVendortypeRowStart = () => {
  return {
    type: actionType.EDIT_VENDORTYPE_ROW_START,
  };
};

export const failEditVendortype = (error) => {
  return {
    type: actionType.FAIL_EDIT_VENDORTYPE,
    error: error,
  };
};

export const editVendortypeRow = (
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editVendortypeRowStart());
    setEditing(true);
    axios
      .get(`vendortypes/${id}`)
      .then((res) => {
        console.log(res.data, "editing data res");
        setEditing(res.data);
        setCurrentUser({
          id: res.data.id,
          name: res.data.name,
          under_group_name: res.data.under_group_name,
        });
      })
      .catch((error) => dispatch(failEditVendortype(error)));
  };
};

export const updateVendortypeDataStart = () => {
  return {
    type: actionType.UPDATE_VENDORTYPE_DATA_START,
  };
};

export const updateVendortypeData = (id, user, toggle) => {
  return (dispatch) => {
    dispatch(updateVendortypeDataStart());

    axios
      .post(`vendortypes/${id}?_method=PUT`, user)
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Vendor Type!").then(() => {
          dispatch(vendortypeGetData());
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
