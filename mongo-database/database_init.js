const mongoose = require('mongoose');
const Game = require('./models/GameModel')
const Index = require('./models/IndexModel')
const Score = require('./models/ScoreModel')
const fs = require('fs');
const JSONStream = require('JSONStream')
const es = require('event-stream');

const game_data = require('../clean_data/game_data.json')
const { ObjectId } = require('bson');

var games = []
var scores = []
let counter = 0

game_data.game_data.forEach(videogame => {

    let new_game = new Game();
    new_game._id = new ObjectId()
    new_game.id = counter
    new_game.Name = videogame.name;
    new_game.Genre = videogame.genre;
    new_game.Developer = videogame.developer;
    new_game.Tags = videogame.popular_tags;
    new_game.Url = videogame.url;
    new_game.ReleaseDate = videogame.release_date;
    new_game.Details = videogame.game_details;
    new_game.Description = videogame.game_description;
    new_game.BagOfWords = videogame.bag_of_words;
    counter++
    games.push(new_game)
})

var getStream = function () {
    var jsonData = '../clean_data/cosine_sim.json',
        stream = fs.createReadStream(jsonData, { encoding: 'utf8' }),
        parser = JSONStream.parse('*');
    return stream.pipe(parser);
};


const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect('mongodb+srv://bruce_fernandes:goanboy12345@videogamecluster.msextg4.mongodb.net/?retryWrites=true&w=majority');

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

    console.log("Connected to Video Game Database!");



    Game.insertMany(games, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        getStream()
            .pipe(es.mapSync(function (data) {
                c = 0

                data.forEach(score => {
                    let new_score = new Score();
                    new_score.id = c;
                    new_score.Scores = score;
                    scores.push(new_score);
                    c++

                })
                Score.insertMany(scores, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(result);
                    mongoose.connection.close()

                })
            }));


    });



});