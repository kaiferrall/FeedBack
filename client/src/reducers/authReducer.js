import { SET_LOGGED_IN_USER } from "../actions/types";

const initialState = {
  user: {},
  authorization: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOGGED_IN_USER:
      return {
        ...state,
        user: action.payload.user,
        authorization: action.payload.auth
      };
    default:
      return state;
  }
}
