import { GET_ERRORS, GET_ALL_COURSES, SET_LOADING } from "./types";
import axios from "axios";

export const getAllCourses = () => dispatch => {
  dispatch(setLoading(true));
  axios
    .get(`/api/courses/all`)
    .then(res => {
      dispatch({ type: GET_ALL_COURSES, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
      dispatch(setLoading(false));
    });
};

export const createCourse = (courseData, userId) => dispatch => {
  axios
    .post("/api/courses/create", courseData)
    .then(res => {
      dispatch(getAllCourses());
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};
export const setLoading = loadingState => {
  return {
    type: SET_LOADING,
    payload: loadingState
  };
};
