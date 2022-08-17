const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let indexSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    IndexTitle: String

});

module.exports = mongoose.model('Index', indexSchema)