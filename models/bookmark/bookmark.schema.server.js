var mongoose = require('mongoose');
var bookmarkSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    movie: {type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'},
    date: String

    // grade: String
}, {collection: 'bookmark'});
module.exports = bookmarkSchema;

