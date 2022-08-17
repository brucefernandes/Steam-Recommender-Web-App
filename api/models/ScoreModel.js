const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let scoreSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,

    Scores: [Number]

});

module.exports = mongoose.model('Score', scoreSchema)