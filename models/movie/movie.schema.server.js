var mongoose = require('mongoose');
var movieSchema = mongoose.Schema({
    id: String,
    imdb_id: String,
    title: String,
    poster_path: String,
    overview: String,
    likes: Number,
    comments: Number,
}, {collection: 'movie'});
module.exports = movieSchema;