var mongoose = require('mongoose');
var reviewSchema = require('./review.schema.server');
var reviewModel = mongoose.model(
    'ReviewModel',
    reviewSchema
);

function userReviewsMovie(user, movie, review) {
    var date = new Date();
    var c = {
        user: user._id,
        movie: movie._id,
        username: user.username,
        title: movie.title,
        review: review,
        date: date.toString()
    };
    return reviewModel.create(c);
}

function findReviewedMoviesForUser(userId) {
    return reviewModel
        .find({user: userId})
        .populate('movie')
        .exec();
}

function findAllReviewsForMovie(movieId) {
    return reviewModel
        .find({movie: movieId})
        .populate('user')
        .exec();
}

function deleteMovie(movieId){
    return reviewModel.remove({movie: movieId})
}


module.exports = {
    userReviewsMovie: userReviewsMovie,
    findReviewedMoviesForUser: findReviewedMoviesForUser,
    findAllReviewsForMovie: findAllReviewsForMovie,
    deleteMovie: deleteMovie
};