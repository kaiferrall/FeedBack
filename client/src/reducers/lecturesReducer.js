import {
  GET_ALL_LECTURES,
  SET_LECTURES_LOADING,
  SET_LECTURE_LOADING,
  GET_LECTURE
} from "../actions/types";

const initialState = {
  loading: false,
  lectures: [],
  lecture: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LECTURES_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case GET_ALL_LECTURES:
      return {
        ...state,
        lectures: action.payload,
        loading: false
      };
    case GET_LECTURE:
      return {
        ...state,
        lecture: action.payload,
        loading: false
      };
    case SET_LECTURE_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
}
