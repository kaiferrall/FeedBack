import {
  GET_ERRORS,
  GET_ALL_LECTURES,
  SET_LECTURES_LOADING,
  GET_LECTURE
} from "./types";
import axios from "axios";
//FIX THIS! NEEDS TO HAVE A CATCH METHOD
export const getAllLectures = courseId => dispatch => {
  dispatch(lecturesLoading(true));
  axios
    .get(`/api/lectures/all/${courseId}`)
    .then(res => {
      dispatch(lecturesLoading(false));
      dispatch({ type: GET_ALL_LECTURES, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
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

export const openLecture = (lectureId, courseId) => dispatch => {
  axios
    .put(`/api/lectures/open/${lectureId}`, { courseId: courseId })
    .then(res => {
      let redirect = `/dashboard/lecture/${lectureId}`;
      dispatch(getLecture(lectureId));
      window.location.href = redirect;
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};
export const closeLecture = lectureId => dispatch => {
  axios
    .put(`/api/lectures/close/${lectureId}`)
    .then(res => {
      dispatch(getLecture(lectureId));
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteLecture = (lectureId, courseId) => dispatch => {
  axios
    .delete(`/api/lectures/delete/${lectureId}`)
    .then(res => {
      if (res.data.success) {
        let redirect = `/dashboard/course/${courseId}`;
        window.location.href = redirect;
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const lecturesLoading = loadingState => {
  return {
    type: SET_LECTURES_LOADING,
    payload: loadingState
  };
};
