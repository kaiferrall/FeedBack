const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegister(data) {
  const errors = {};

  data.username = isEmpty(data.username) ? "" : data.username;
  data.name = isEmpty(data.name) ? "" : data.name;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.password2 = isEmpty(data.password2) ? "" : data.password2;
  //Username
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  } else if (!Validator.isLength(data.username, { min: 3, max: 20 })) {
    errors.username = "Username must be between 3 and 20 characters";
  }
  //Name
  if (Validator.isEmpty(data.name)) {
    errors.name = "Your name is required";
  } else if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Keep your name within 2 to 30 characters";
  }
  //Passwords
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  } else {
    if (!Validator.isLength(data.password, { min: 8, max: 40 })) {
      errors.password = "Password must be between 8 and 40 characters";
    } else if (Validator.isAlpha(data.password)) {
      errors.password = "Password must contain both numbers and letters";
    } else if (!Validator.isAlphanumeric(data.password)) {
      errors.password = "Password may only contain numbers and letters";
    }
    if (Validator.isEmpty(data.password2)) {
      errors.password2 = "Please confirm password";
    } else {
      if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
      }
    }
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
