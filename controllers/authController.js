"use strict";
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, gender, dob } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // const accessToken = generateToken();

    return res.status(201).send(hashedPassword);
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = { registerUser };
