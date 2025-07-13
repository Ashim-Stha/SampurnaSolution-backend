"use strict";
const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");

app.use(express.json());

connectDB();
app.use("/auth", authRoute);

app.listen(3000, () => {
  console.log("Server listening at 3000");
});
