import * as actionType from "../action/ActionTypes";

const initialState = {
  transaction: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.TRANSACTION_SET_DATA:
      return {
        ...state,
        transaction: action.transaction,
        error: false,
      };

    case actionType.TRANSACTION_FAIL_DATA:
      return {
        ...state,
        error: action.error,
      };

    case actionType.POST_TRANSACTION_DATA_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case actionType.EDIT_TRANSACTION_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_TRANSACTION_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_TRANSACTION:
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
