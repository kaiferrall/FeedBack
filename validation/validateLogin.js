const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLogin(data) {
  const errors = {};

  data.username = isEmpty(data.username) ? "" : data.username;
  data.password = isEmpty(data.password) ? "" : data.password;
  //Username
  if (Validator.isEmpty(data.username)) {
    errors.username = "Please enter your username";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Please enter your password";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
