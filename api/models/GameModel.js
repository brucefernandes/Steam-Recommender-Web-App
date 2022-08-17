const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let gameSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    Name: String,
    Genre: [String],
    Developer: [String],
    Tags: [String],
    Url: String,
    imageId: String,
    ReleaseDate: String,
    Details: String,
    Description: String,
    BagOfWords: String
});

module.exports = mongoose.model('Game', gameSchema)