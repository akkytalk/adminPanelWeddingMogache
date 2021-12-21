import * as actionType from "./ActionTypes";
import axios from "../../axios";
import swal from "sweetalert";

export const vendorSetData = (vendor) => {
  return {
    type: actionType.VENDOR_SET_DATA,
    vendor: vendor,
  };
};

export const vendorFailData = () => {
  return {
    type: actionType.VENDOR_FAIL_DATA,
  };
};

export const vendorGetData = () => {
  return (dispatch) => {
    axios
      .get("vendors")
      .then((res) => {
        console.log(res.data, "res");
        dispatch(vendorSetData(res.data));
      })

      .catch((error) => dispatch(vendorFailData()));
  };
};

export const deleteVendorFail = () => {
  return {
    type: actionType.DELETE_VENDOR_FAIL,
  };
};

export const deleteVendor = (id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(`vendors/${id}`)
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Account Group!").then(() => {
            dispatch(vendorGetData());
          });
        })
        .catch((error) => dispatch(deleteVendorFail()));
    }
  };
};

export const postVendorDataStart = () => {
  return {
    type: actionType.POST_VENDOR_DATA_START,
  };
};

export const postVendorDataFail = () => {
  return {
    type: actionType.POST_VENDOR_DATA_FAIL,
  };
};

export const postVendorData = (user, toggle) => {
  return (dispatch) => {
    dispatch(postVendorDataStart());
    axios
      .post("vendorRegister", user)
      .then(() => {
        console.log("swal");
        swal("Successfully Created Vendor!").then(() => {
          dispatch(vendorGetData());
          toggle();
        });
      })
      .catch((error) => dispatch(postVendorDataFail()));
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editVendorRowStart = () => {
  return {
    type: actionType.EDIT_VENDOR_ROW_START,
  };
};

export const editVendorSetData = (editVendor) => {
  return {
    type: actionType.EDIT_VENDOR_SET_DATA,
    editVendor: editVendor,
  };
};

export const failEditVendor = (error) => {
  return {
    type: actionType.FAIL_EDIT_VENDOR,
    error: error,
  };
};

export const editVendorRow = (id) => {
  return (dispatch) => {
    dispatch(editVendorRowStart());
    // setEditing(true);
    axios
      .get(`vendors/${id}`)
      .then((res) => {
        console.log(res.data, "editing data res");
        // setEditing(res.data);
        // setVendor(res.data);
        dispatch(editVendorSetData(res.data));
        // console.log("editVendor data from", res.data);
      })
      .catch((error) => dispatch(failEditVendor(error)));
  };
};

export const updateVendorDataStart = () => {
  return {
    type: actionType.UPDATE_VENDOR_DATA_START,
  };
};

export const updateVendorData = (data, toggle) => {
  return (dispatch) => {
    dispatch(updateVendorDataStart());
    //setEditing(false);

    console.log("data", data);
    //const image = data.image;
    axios
      .put(`vendors/${data.id}`, data)
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Vendor details!").then(() => {
          dispatch(vendorGetData());
          toggle();
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const VendorImageUpload = (id, data, progress, setProgress) => {
  return (dispatch) => {
    dispatch(updateVendorDataStart());

    console.log("data", data);

    axios
      .put(`updateImage/${id}?_method=PUT`, data)
      .then((res) => {
        const progress = Math.round(
          (res.bytesTransferred / res.totalBytes) * 100
        );
        setProgress(progress);
        console.log("swal");
        swal("Successfully Updated Vendor Pic!").then(() => {
          dispatch(vendorGetData());
        });
      })
      .then((data) => console.log("output", data.json()))
      .catch((error) => {
        console.log(error.response);
      });
  };
};
