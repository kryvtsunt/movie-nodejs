var mongoose = require('mongoose');
var reviewSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    movie: {type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'},
    review: String,
    vissibility: String,
    recomended: Boolean,
    date: String,
}, {collection: 'review'});
module.exports = reviewSchema;

