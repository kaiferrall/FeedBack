import {
  GET_ERRORS,
  GET_ALL_LECTURES,
  SET_LECTURES_LOADING,
  GET_LECTURE
} from "./types";
import axios from "axios";

export const getAllLectures = courseId => dispatch => {
  dispatch(lecturesLoading(true));
  axios.get(`/api/lectures/all/${courseId}`).then(res => {
    if (res.data.lectures) {
      dispatch({ type: GET_ERRORS, payload: res.data });
    } else {
      dispatch({ type: GET_ALL_LECTURES, payload: res.data });
    }
    dispatch(lecturesLoading(false));
  });
};

export const getLecture = lectureId => dispatch => {
  dispatch(lecturesLoading(true));
  axios
    .get(`/api/lectures/lecture/${lectureId}`)
    .then(res => {
      dispatch({ type: GET_LECTURE, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const createLecture = lectureData => dispatch => {
  axios
    .post("/api/lectures/create", lectureData)
    .then(res => {
      dispatch(getAllLectures(lectureData.courseId));
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const saveForm = questionsAndId => dispatch => {
  axios.post("/api/forms/save", questionsAndId).then(res => {
    dispatch(getLecture(questionsAndId.lectureId));
  });
};

export const lecturesLoading = loadingState => {
  return {
    type: SET_LECTURES_LOADING,
    payload: loadingState
  };
};
