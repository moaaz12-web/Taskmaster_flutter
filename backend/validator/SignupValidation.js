const validator = require("validator");
const isEmpty = require("./IsEmpty");

module.exports = function SignupValidation(data) {
  let regex = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/i;
  let errors = {};
  // Convert empty fields to an empty string so we can use validator
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // Name checks

  // Email checks
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Format Email required";
  }

  // Password checks
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } 
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
