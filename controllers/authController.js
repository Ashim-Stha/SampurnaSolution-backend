"use strict";
const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, gender, dob } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const accessToken = generateToken({ username, email });
    return res.status(201).send(accessToken);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

module.exports = { registerUser };
