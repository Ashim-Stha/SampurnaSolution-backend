"use strict";
const bcrypt = require("bcryptjs");

const User = require("../model/User");
const generateToken = require("../utils/generateToken");
const response = require("../utils/responseHandler");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, gender, dob } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response(res, 400, "User already exists");
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
    res.cookie("auth_token", accessToken, {
      httpOnly: true,
    });
    await newUser.save();

    return response(res, 201, "User created successfully", {
      username: newUser.username,
      email: newUser.email,
    });
  } catch (e) {
    return response(res, 500, "Internal Server Error", e.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return response(res, 404, "User not found");
    }

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return response(res, 404, "Invalid password");
    }

    const accessToken = generateToken(user);
    res.cookie("auth_token", accessToken, {
      httpOnly: true,
    });

    return response(res, 201, "User logged in successfully", {
      username: user.username,
      email: user.email,
    });
  } catch (e) {
    console.error(e);
    return response(res, 500, "Internal Server Error", e.message);
  }
};

module.exports = { registerUser, loginUser };
