var mongoose = require('mongoose');
var likeSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    movie: {type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'},
    date: String

    // grade: String
}, {collection: 'like'});
module.exports = likeSchema;

