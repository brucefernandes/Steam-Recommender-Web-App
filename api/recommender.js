const mongoose = require("mongoose");
const Game = require('../mongo-database/models/GameModel')
const Score = require('../mongo-database/models/ScoreModel')


function mapOrder(array, order, key) {

    array.sort(function (a, b) {
        var A = a[key], B = b[key];

        if (order.indexOf(A) > order.indexOf(B)) {
            return 1;
        } else {
            return -1;
        }

    });

    return array;
};
const recommender = async (name) => {

    //grab the id of the game we want to base recom. of
    let game = await Game.findOne({ Name: name }).exec()

    let cosine_scores = await Score.findOne({ id: game.id }).exec()

    let counter = 0
    organized_scores = cosine_scores.Scores.map(item => {
        let obj = { id: counter, value: item }
        counter++;
        return obj
    })

    new_scores = organized_scores.sort((a, b) => { return b.value - a.value })
    top_10_indices = new_scores.slice(1, 15).map(item => { return item.id })

    let final = await Game.find().where('id').in(top_10_indices).exec()

    console.log(mapOrder(final, top_10_indices, 'id').map(item => { return item.Name }));

}

recommender("Dota 2")

mongoose.connect('mongodb://localhost/videogames');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to Video Game Database!");
});