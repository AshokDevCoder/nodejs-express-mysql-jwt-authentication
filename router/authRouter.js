const router = require("express").Router();
const { home, register, login } = require("../controller/authController");
//importing express validater middleware from authvalidator file
const {
  userRegisterValidator,
  userLoginValidator,
} = require("../validators/authValidators");
//importing expree runValidation middleware from validators/index.js file
const { runValidation } = require("../validators/index");

//api home route url: http://localhost:6001/api/
router.get("/", home);
//api register route url: http://localhost:6001/api/register
router.post("/register", userRegisterValidator, runValidation, register);
//api login route url: http://localhost:6001/api/login
router.post("/login", userLoginValidator, runValidation, login);

module.exports = router;
