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
        review: review,
        date: date.toString()
    };
    return reviewModel.create(c);
}

function userUnReviewsMovie(userId, movieId, review) {
    var c = {
        user: userId,
        movie: movieId,
        review: review,
    };
    return reviewModel.remove(c);
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

function deleteUser(userId){
    return reviewModel.remove({user: userId})
}



module.exports = {
    userReviewsMovie: userReviewsMovie,
    findReviewedMoviesForUser: findReviewedMoviesForUser,
    findAllReviewsForMovie: findAllReviewsForMovie,
    deleteMovie: deleteMovie,
    deleteUser: deleteUser,
    userUnReviewsMovie: userUnReviewsMovie
};