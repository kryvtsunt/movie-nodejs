var mongoose = require('mongoose');
var likeSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    movie: {type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'},

    // grade: String
}, {collection: 'like'});
module.exports = likeSchema;

