const express = require('express');
const { getAllUser, signup } = require('../controllers/user-controller.js');


const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.post("/signup", signup)

module.exports = userRouter;