var mongoose = require('mongoose');
var reviewSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    movie: {type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'},
    review: String,
    visibility: String,
    recommended: Boolean,
    date: String,
}, {collection: 'review'});
module.exports = reviewSchema;

