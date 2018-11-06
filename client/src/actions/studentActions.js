import { GET_ERRORS, GET_FORM } from "./types";
import axios from "axios";

export const enterCode = (lectureCode, settingForm) => dispatch => {
  axios
    .post("/api/students/code", lectureCode)
    .then(res => {
      //setting form is true on second request to persist the form in state
      if (res.data && !settingForm) {
        const redirect = `/form/${lectureCode.code}`;
        dispatch({ type: GET_FORM, payload: res.data });
        window.location.href = redirect;
      } else if (res.data && settingForm) {
        dispatch({ type: GET_FORM, payload: res.data });
      }
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};
export const submitResponse = (lectureCode, response) => dispatch => {
  axios
    .post(`/api/students/submit/${lectureCode}`, response)
    .then(res => {
      window.location.href = "/";
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};
