const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const gameRouter = require('./routes/game.js');

const app = express();

app.use(express.json())
app.use(cors())
app.use('/', gameRouter)

mongoose.connect('mongodb://localhost/videogames');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    app.listen(8080);

    console.log("Connected to Video Game Database!");

});