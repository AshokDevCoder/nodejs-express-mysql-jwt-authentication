const { check } = require("express-validator");
// user register validator for validate user name,email,password on registration  time
exports.userRegisterValidator = [
  check("name").not().isEmpty().withMessage("Please entered a name"),
  check("email").not().isEmpty().withMessage("Please entered an email"),
  check("password").not().isEmpty().withMessage("Please entered a password"),
  check("email").isEmail().withMessage("Please entered  valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
// user login validator for validate user email & password on login time
exports.userLoginValidator = [
  check("email").not().isEmpty().withMessage("Please entered an email"),
  check("password").not().isEmpty().withMessage("Please entered a password"),
  check("email").isEmail().withMessage("Please entered  valid email address"),
];
