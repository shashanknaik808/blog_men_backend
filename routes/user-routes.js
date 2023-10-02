const express = require('express');
const getAllUser = require('../controllers/user-controller.js');
const signup = require("../controllers/user-controller.js");

const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.post("/signup", signup)

module.exports = userRouter;