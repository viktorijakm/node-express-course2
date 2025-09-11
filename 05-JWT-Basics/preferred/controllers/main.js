// controllers/main.js
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

// POST /api/v1/login
const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please provide username and password");
  }

  // Directly generate a token without checking users
  const token = jwt.sign(
    { username }, // store username in token
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({ msg: "Login successful", token });
};

// GET /api/v1/dashboard
const dashboard = (req, res) => {
  res.status(200).json({
    msg: `Welcome ${req.user.username}!`,
    secret: "Here is some secret data for your dashboard.",
  });
};

module.exports = { login, dashboard };

