"use strict";
const bcrypt = require("bcryptjs");

const User = require("../model/User");

const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, gender, dob } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      gender,
      dob,
    });

    const accessToken = generateToken({ username, email });
    await newUser.save();

    return res.status(201).send(accessToken);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

module.exports = { registerUser };
