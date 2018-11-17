const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCourse(data) {
  const errors = {};

  data.course_code = isEmpty(data.course_code) ? "" : data.course_code;
  data.name = isEmpty(data.name) ? "" : data.name;

  //Username
  if (Validator.isEmpty(data.course_code)) {
    errors.course_code = "Course code is required";
  } else {
    if (!Validator.isLength(data.course_code, { min: 0, max: 20 })) {
      errors.course_code = "Course code must be between 0 and 20 characters";
    }
  }
  if (Validator.isEmpty(data.name)) {
    errors.course_name = "Course name is required";
  } else {
    if (!Validator.isLength(data.name, { min: 0, max: 25 })) {
      errors.course_name = "Course name must be between 0 and 25";
    }
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
