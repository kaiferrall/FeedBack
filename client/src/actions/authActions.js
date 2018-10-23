import { GET_ERRORS, SET_LOGGED_IN_USER } from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { setAuthHeader } from "../utilities/setAuthHeader";

export const registerUser = (newUser, history) => dispatch => {
  axios
    .post("/api/users/register", newUser)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("FeedBack_Auth", token);
      setAuthHeader(token);

      const user = jwt_decode(token);
      const authorization = true;
      dispatch(setLoggedInUser(user, authorization));
      window.location.href = "/dashboard";
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("FeedBack_Auth", token);
      setAuthHeader(token);

      const user = jwt_decode(token);
      const authorization = true;
      dispatch(setLoggedInUser(user, authorization));
      window.location.href = "/dashboard";
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const logoutUser = () => dispatch => {
  dispatch(setLoggedInUser({}, false));
  localStorage.removeItem("FeedBack_Auth");
  setAuthHeader(false);
};

//Action Creators
export const setLoggedInUser = (user, authorization) => {
  return {
    type: SET_LOGGED_IN_USER,
    payload: {
      user: user,
      auth: authorization
    }
  };
};
