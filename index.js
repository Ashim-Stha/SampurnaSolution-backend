"use strict";
const express = require("express");
const app = express();

const authRoute = require("./routes/authRoute");

app.use(express.json());

app.use("/auth", authRoute);

app.listen(3000, () => {
  console.log("Server listening at 3000");
});
