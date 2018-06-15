var mongoose = require('mongoose');
var likeSchema = require('./like.schema.server');
var likeModel = mongoose.model(
  'LikeModel',
  likeSchema
);

function userLikesMovie(userId, movieId) {
  var like = {
    user: userId,
    movie: movieId
  };
  return likeModel.create(like);
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

module.exports = {
    userLikesMovie: userLikesMovie,
    findLikedMoviesForUser: findLikedMoviesForUser,
    findUsersforLikedMovie: findUsersforLikedMovie
};