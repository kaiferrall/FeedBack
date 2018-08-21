const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCourse(data) {
  const errors = {};

  data.course_code = isEmpty(data.course_code) ? "" : data.course_code;

  //Username
  if (Validator.isEmpty(data.course_code)) {
    errors.course_code = "Course code is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
