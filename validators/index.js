const { validationResult } = require("express-validator");

//running the runValidation middleware to checking error
// msg if any occurs on registration or login time and
// sending error message as json object
exports.runValidation = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ message: error.array()[0].msg });
  }
  next();
};
