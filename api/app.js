const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const gameRouter = require('./routes/game.js');
require("dotenv").config()

let expressPort = process.env.PORT || 9000

const app = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/', gameRouter)


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connnected to Mongo Atlas at link: " + process.env.MONGO_URL);
    });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    app.listen(expressPort, () => {
        console.log("Server is running at Port: " + expressPort);
    })

});