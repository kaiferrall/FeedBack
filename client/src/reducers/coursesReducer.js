import { GET_ALL_COURSES, SET_LOADING } from "../actions/types";

const initialState = {
  loading: false,
  courses: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case GET_ALL_COURSES:
      return {
        ...state,
        courses: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
