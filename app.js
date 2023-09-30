const express = require('express');
const mongoose = require('mongoose');
const router = require("./routes/user-routes.js");

const app = express();

app.use("/api/user" ,router)

mongoose
    .connect('mongodb+srv://shashanknaik808:qwerty123456@cluster0.nzvwcqv.mongodb.net/Blog?retryWrites=true&w=majority'
    )
    .then(() => app.listen(5000))
    .then(() =>
        console.log("Connected TO Database and Listening TO Localhost 5000")
    )
    .catch((err) => console.log(err));
