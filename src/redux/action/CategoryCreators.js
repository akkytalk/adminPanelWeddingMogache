import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const categorySetData = (category) => {
  return {
    type: actionType.CATEGORY_SET_DATA,
    category: category,
  };
};

export const categoryFailData = () => {
  return {
    type: actionType.CATEGORY_FAIL_DATA,
  };
};

export const categoryGetData = (data) => {
  return (dispatch) => {
    console.log(data);
    axios
      .get(baseUrl + "categories", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(categorySetData(res.data));

        console.log("response data", res.data);
      })
      .catch((err) => console.log(err));
    //   .catch((error) => dispatch(categoryFailData()));
  };
};

export const deleteCategoryFail = () => {
  return {
    type: actionType.DELETE_CATEGORY_FAIL,
  };
};

export const deleteCategory = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `categories/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Category!").then(() => {
            dispatch(categoryGetData(data));
          });
        })
        .catch((error) => dispatch(deleteCategoryFail()));
    }
  };
};

export const postCategoryDataStart = () => {
  return {
    type: actionType.POST_CATEGORY_DATA_START,
  };
};

export const postCategoryDataFail = () => {
  return {
    type: actionType.POST_CATEGORY_DATA_FAIL,
  };
};

export const postCategoryData = (data, user, toggle) => {
  return (dispatch) => {
    // if (!user.name) return;
    // console.log("postCategoryData", data);
    dispatch(postCategoryDataStart());

    axios
      .post(baseUrl + "categories", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Category!").then(() => {
          dispatch(categoryGetData(data));
          toggle();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postCategoryDataFail());
      });
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editCategoryRowStart = () => {
  return {
    type: actionType.EDIT_CATEGORY_ROW_START,
  };
};

export const failEditCategory = () => {
  return {
    type: actionType.FAIL_EDIT_CATEGORY,
  };
};

export const editCategoryRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editCategoryRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `categories/${id}`, {
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
      .catch((error) => dispatch(failEditCategory()));
  };
};

export const updateCategoryDataStart = () => {
  return {
    type: actionType.UPDATE_CATEGORY_DATA_START,
  };
};

export const updateCategoryData = (data, user, toggle) => {
  return (dispatch) => {
    dispatch(updateCategoryDataStart());

    axios
      .post(baseUrl + `categories/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Category!").then(() => {
          toggle();
          dispatch(categoryGetData(data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
