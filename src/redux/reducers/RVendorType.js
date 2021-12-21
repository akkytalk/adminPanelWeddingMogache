import * as actionType from "../action/ActionTypes";

const initialState = {
  vendortype: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.VENDORTYPE_SET_DATA:
      return {
        ...state,
        vendortype: action.vendortype,
        error: false,
      };

    case actionType.VENDORTYPE_FAIL_DATA:
      return {
        ...state,
        error: true,
      };

    case actionType.POST_VENDORTYPE_DATA_FAIL:
      return {
        ...state,
        error: true,
      };

    case actionType.EDIT_VENDORTYPE_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_VENDORTYPE_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_VENDORTYPE:
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
