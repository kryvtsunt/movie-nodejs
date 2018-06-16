var mongoose = require('mongoose');
var commentSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    movie: {type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'},
    username: String,
    title: String,
    comment: String,
    date: String,
}, {collection: 'comment'});
module.exports = commentSchema;

