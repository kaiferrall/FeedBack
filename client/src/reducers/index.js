import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import coursesReducer from "./coursesReducer";
import lectureReducer from "./lecturesReducer";

export default combineReducers({
  status: authReducer,
  errors: errorReducer,
  courses: coursesReducer,
  lectures: lectureReducer
});
