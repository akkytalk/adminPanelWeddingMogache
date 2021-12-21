import * as actionType from "../action/ActionTypes";

const initialState = {
  customer: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CUSTOMER_SET_DATA:
      return {
        ...state,
        customer: action.customer,
        error: false,
      };

    case actionType.CUSTOMER_FAIL_DATA:
      return {
        ...state,
        error: action.error,
      };

    case actionType.POST_CUSTOMER_DATA_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case actionType.EDIT_CUSTOMER_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_CUSTOMER_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_CUSTOMER:
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
