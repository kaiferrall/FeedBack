const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLecture(data) {
  const errors = {};

  data.name = isEmpty(data.name) ? "" : data.name;

  //Username
  if (Validator.isEmpty(data.name)) {
    errors.name = "Your lecture must have a name";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
