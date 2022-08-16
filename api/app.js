const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const gameRouter = require('./routes/game.js');

const app = express();
let port = process.env.PORT || 3000
app.use(express.json())
app.use(cors())
app.use('/', gameRouter)

let mongoAtlasStr = 'mongodb+srv://bruce_fernandes:goanboy12345@videogamecluster.msextg4.mongodb.net/?retryWrites=true&w=majority'


mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
.then(()=>{
    console.log("Connnected to Mongo Atlas");
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    app.listen(port, () =>{
        console.log("API Ready listening on Port: " + port);
    })

});