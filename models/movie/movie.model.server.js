var mongoose = require('mongoose');
var movieSchema = require('./movie.schema.server');
var movieModel = mongoose.model('MovieModel', movieSchema);

function createMovie(movie) {
    movie.likes = 0;
    return movieModel.create(movie);
}

function findMovieByApiId(movieId) {
    return movieModel.findOne({id: movieId});
}

function findMoviesLikedByUser(userId) {
    return movieModel.find({userId: userId});
}

function incrementMovieLikes(movieId) {
    return movieModel.update({_id: movieId}, {
        $inc: {likes: 1}
    });
}

function decrementMovieLikes(movieId) {
    return movieModel.update({_id: movieId}, {
        $inc: {likes: -1}
    });
}


function incrementMovieComments(movieId) {
    return  movieModel.update({_id: movieId}, {
        $inc: {comments: 1}
    });
}



module.exports = {
    createMovie: createMovie,
    findMoviesLikedByUser: findMoviesLikedByUser,
    incrementMovieLikes: incrementMovieLikes,
    decrementMovieLikes: decrementMovieLikes,
    findMovieByApiId: findMovieByApiId,
    incrementMovieComments: incrementMovieComments,
};