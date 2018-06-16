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
        username: user.username,
        title: movie.title,
        date: date.toString()
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

function findBookmarkdMoviesForUser(userId) {
    return bookmarkModel
        .find({user: userId})
        .populate('movie')
        .exec();
}

function findUsersforBookmarkdMovie(movieId) {
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


module.exports = {
    userBookmarksMovie: userBookmarksMovie,
    userUnbookmarksMovie: userUnbookmarksMovie,
    findBookmarkdMoviesForUser: findBookmarkdMoviesForUser,
    findUsersforBookmarkdMovie: findUsersforBookmarkdMovie,
    checkBookmark: checkBookmark,
};