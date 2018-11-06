import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import coursesReducer from "./coursesReducer";
import lectureReducer from "./lecturesReducer";
import studentReducer from "./studentReducer";

export default combineReducers({
  status: authReducer,
  errors: errorReducer,
  courses: coursesReducer,
  lectures: lectureReducer,
  students: studentReducer
});
