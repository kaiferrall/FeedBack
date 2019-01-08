import { SET_LOADING, GET_FORM } from "../actions/types";

const initialState = {
  form: [],
  status: {},
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FORM:
      return {
        ...state,
        form: action.payload.form,
        commentStatus: action.payload.commentStatus
      };

    default:
      return state;
  }
}
