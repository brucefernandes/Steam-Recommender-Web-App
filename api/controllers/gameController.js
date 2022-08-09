const Game = require('../../mongo-database/models/GameModel')
const Score = require('../../mongo-database/models/ScoreModel')


const mapOrder = (array, order, key) => {

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


exports.recommend_games = async (req, res) => {
    try {
        game = await Game.findOne({ Name: req.body.name }).exec()
        if (!game) {
            throw new Error('no document found');
        }

    } catch (err) {
        res.status(404).send("The Game " + req.body.name + " does not exist!");
        return
    }

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
    res.format({
        'application/json': function () {
            console.log("The request was JSON..");
            res.status(200).send(JSON.stringify(mapOrder(final, top_10_indices, 'id')));


        }
    })

}

exports.search_games = (req, res, next) => {
    let limit = 15;
    if (req.query.limit) limit = req.query.limit;

    Game.find().limit(limit).exec((err, games) => {

        if (err) res.status(404).send("ERROR 404: " + err);

        res.format({
            'application/json': function () {
                console.log("The request was JSON..");
                res.status(200).send(JSON.stringify(games))

            }
        })
    })
}

exports.game_titles = (req, res, next) => {
    Game.find({}, { Name: 1, id: 1, _id: 0 }).exec((err, games) => {
        if (err) res.status(404).send("ERROR 404: " + err);

        res.format({
            'application/json': function () {
                console.log("The request was JSON..");
                res.status(200).send(JSON.stringify(games))

            }
        })
    })
}