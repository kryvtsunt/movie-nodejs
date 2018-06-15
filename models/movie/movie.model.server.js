var mongoose = require('mongoose');
var movieSchema = require('./movie.schema.server');
var movieModel = mongoose.model('MovieModel', movieSchema);

function createMovie(section) {
    return movieModel.create(section);
}

function findMoviesLikedByUser(userId) {
    return sectionModel.find({userId: userId});
}

function incrementMovieLikes(movieId) {
    return movieModel.update({_id: movieId}, {
        $inc: {nlikes: 1}
    });
}

function decrementMovieLikes(movieId) {
    return movieModel.update({_id: movieId}, {
        $inc: {nlikes: -1}
    });
}


module.exports = {
    createMovie: createMovie,
    findMoviesLikedByUser: findMoviesLikedByUser,
    incrementMovieLikes: incrementMovieLikes,
    decrementMovieLikes: decrementMovieLikes
};