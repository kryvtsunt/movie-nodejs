var mongoose = require('mongoose');
var bookmarkSchema = require('./bookmark.schema.server');
var bookmarkModel = mongoose.model(
    'BookmarkModel',
    bookmarkSchema
);

function userBookmarksMovie(user, movie) {
    var date = new Date();
    var bookmark = {
        user: user._id,
        movie: movie._id,
        date: date
    };
    return bookmarkModel.create(bookmark);
}

function userUnbookmarksMovie(user, movie) {
    var bookmark = {
        user: user._id,
        movie: movie._id
    };
    return bookmarkModel.deleteOne(bookmark);
}

function findBookmarkedMoviesForUser(userId) {
    return bookmarkModel
        .find({user: userId})
        .populate('movie')
        .exec();
}

function findUsersforBookmarkedMovie(movieId) {
    return bookmarkModel
        .find({movie: movieId})
        .populate('user')
        .exec();
}

function checkBookmark(userId, movieId) {
    var bookmark = {
        user: userId,
        movie: movieId
    }
    return bookmarkModel.findOne(bookmark);
}

function deleteMovie(movieId){
    return bookmarkModel.remove({movie: movieId})
}

function deleteUser(userId){
    return bookmarkModel.remove({user: userId})
}


module.exports = {
    userBookmarksMovie: userBookmarksMovie,
    userUnbookmarksMovie: userUnbookmarksMovie,
    findBookmarkedMoviesForUser: findBookmarkedMoviesForUser,
    findUsersforBookmarkedMovie: findUsersforBookmarkedMovie,
    checkBookmark: checkBookmark,
    deleteMovie: deleteMovie,
    deleteUser: deleteUser
};