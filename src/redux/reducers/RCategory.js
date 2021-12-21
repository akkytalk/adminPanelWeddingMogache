import * as actionType from "../action/ActionTypes";

const initialState = {
  category: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CATEGORY_SET_DATA:
      return {
        ...state,
        category: action.category,
        error: false,
      };

    case actionType.CATEGORY_FAIL_DATA:
      return {
        ...state,
        error: action.error,
      };

    case actionType.POST_CATEGORY_DATA_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case actionType.EDIT_CATEGORY_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_CATEGORY_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_CATEGORY:
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
