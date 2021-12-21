import * as actionType from "../action/ActionTypes";

const initialState = {
  vendor: [],
  editVendor: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.VENDOR_SET_DATA:
      return {
        ...state,
        vendor: action.vendor,
        error: false,
      };

    case actionType.VENDOR_FAIL_DATA:
      return {
        ...state,
        error: true,
      };

    case actionType.POST_VENDOR_DATA_FAIL:
      return {
        ...state,
        error: true,
      };

    case actionType.EDIT_VENDOR_ROW_START:
      return {
        ...state,
      };

    case actionType.EDIT_VENDOR_SET_DATA:
      return {
        ...state,
        editVendor: action.editVendor,
        error: action.error,
      };

    case actionType.UPDATE_VENDOR_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_VENDOR:
      return {
        ...state,
        editing: true,
        currentUser: [
          {
            id: action.id,
            name: action.name,
          },
        ],
      };
    default:
      return state;
  }
};

export default reducer;
