const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { usename: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "10d" }
  );
};

module.exports = generateToken;
