var mongoose = require('mongoose');
var commentSchema = require('./comment.schema.server');
var commentModel = mongoose.model(
    'CommentModel',
    commentSchema
);

function userCommentsMovie(user, movie, comment) {
    var date = new Date();
    var c = {
        user: user._id,
        movie: movie._id,
        username: user.username,
        title: movie.title,
        comment: comment,
        date: date.toString()
    };
    return commentModel.create(c);
}

function findCommentedMoviesForUser(userId) {
    return commentModel
        .find({user: userId})
        .populate('movie')
        .exec();
}

function findUsersForCommentedMovie(movieId) {
    return commentModel
        .find({movie: movieId})
        .populate('user')
        .exec();
}

function findAllComments(movieId) {
    return commentModel.find({movie: movieId});
}

module.exports = {
    userCommentsMovie: userCommentsMovie,
    findCommentedMoviesForUser: findCommentedMoviesForUser,
    findUsersForCommentedMovie: findUsersForCommentedMovie,
    findAllComments: findAllComments,
};