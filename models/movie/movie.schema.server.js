var mongoose = require('mongoose');
var movieSchema = mongoose.Schema({
    title: String,
    poster_path: String,
    overview: String,
    users: [String]
}, {collection: 'movie'});
module.exports = movieSchema;