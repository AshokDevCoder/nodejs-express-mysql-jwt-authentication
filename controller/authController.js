const db = require("../db/db.config");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
/////
exports.home = (req, res) => {
  res.json({
    message: "home",
  });
};
// register controller
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email =?",
    [email],
    async (error, results) => {
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      if (results.length > 0) {
        return res.status(409).json({ message: "User already exists." });
      }
      let hashPassword = await bcryptjs.hash(password, 10);
      db.query(
        "INSERT INTO users (name,email,password) VALUES (?, ?,?)",
        [name, email, hashPassword],
        async (error, results) => {
          if (error) {
            return res.status(400).json({ message: error.message });
          }

          let user_id = results.insertId;

          return res.status(201).json({
            message: "User created",
            user: {
              id: user_id,
              name: name,
              email: email,
            },
          });
        }
      );
    }
  );
};
// login controller
exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (error, results) => {
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      if (
        !results ||
        !(await bcryptjs.compare(password, results[0].password))
      ) {
        return res.status(400).json({ message: "Invalid email or password." });
      }
      const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      res.cookie(process.env.JWT_COOKIE_NAME, token, { expiresIn: "2d" });
      const { id, name, email } = results[0];
      return res.status(200).json({
        message: "User login successful",
        token: token,
        user: { id, name, email },
      });
    }
  );
};

//user logout
exports.logout = (req, res) => {
  res.clearCookie(process.env.JWT_COOKIE_NAME);
  res.json({
    message: "User logged out",
  });
};
// secretRoute
exports.userDashboard = (req, res) => {
  const { rawHeaders, auth, body } = req;
  const { id } = auth;
  const { email } = body;
  const token = rawHeaders[1];
  res.json({
    message: "user dashboard secret route",
    token,
    user: {
      id,
      email,
    },
  });
};
//checking login user have jwt token
exports.requireLogin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
