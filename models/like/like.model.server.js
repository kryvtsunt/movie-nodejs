var mongoose = require('mongoose');
var likeSchema = require('./like.schema.server');
var likeModel = mongoose.model(
    'LikeModel',
    likeSchema
);

function userLikesMovie(user, movie) {
    var date = new Date();
    var like = {
        user: user._id,
        movie: movie._id,
        date: date.toString()
    };
    return likeModel.create(like);
}

function userUnlikesMovie(user, movie) {
    var like = {
        user: user._id,
        movie: movie._id
    };
    return likeModel.deleteOne(like);
}

function findLikedMoviesForUser(userId) {
    return likeModel
        .find({user: userId})
        .populate('movie')
        .exec();
}

function findUsersforLikedMovie(movieId) {
    return likeModel
        .find({movie: movieId})
        .populate('user')
        .exec();
}

function checkLike(userId, movieId) {
    var like = {
        user: userId,
        movie: movieId
    }
    return likeModel.findOne(like);
}


module.exports = {
    userLikesMovie: userLikesMovie,
    userUnlikesMovie: userUnlikesMovie,
    findLikedMoviesForUser: findLikedMoviesForUser,
    findUsersforLikedMovie: findUsersforLikedMovie,
    checkLike: checkLike,
};