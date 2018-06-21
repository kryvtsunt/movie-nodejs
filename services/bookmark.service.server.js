module.exports = function (app) {

    app.post('/api/bookmark/movie/add',
        userBookmarksMovie);
    app.post('/api/bookmark/movie/remove',
        userUnbookmarksMovie);
    app.get('/api/bookmark/movie/:movieId/check',
        checkBookmark);
    app.get('/api/bookmark/user/:userId/movie/',
        findAllBookmarkedMoviesForUser);



    var bookmarkModel = require('../models/bookmark/bookmark.model.server');
    var movieModel = require('../models/movie/movie.model.server');


    function checkBookmark(req, res) {
        var id = req.params['movieId'];
        var user = req.session['currentUser']
        var userId = user._id
        movieModel.findMovieByApiId(id)
            .then(function (m) {
                if (m === null) {
                    res.send(false)
                } else {
                    bookmarkModel.checkBookmark(userId, m._id)
                        .then(function (bookmark) {
                            if (bookmark === null) {
                                res.send(false)
                            } else {
                                res.send(true)
                            }
                        })
                }
            })

    }

    function findAllBookmarkedMoviesForUser(req, res)
    {
        var userId = req.params['userId']
        bookmarkModel.findBookmarkedMoviesForUser(userId)
            .then(function (result) {
                res.json(result);
            })
    }


    function userBookmarksMovie(req, res) {
        var movie = req.body;
        var user = req.session['currentUser']
        var movieId;
        movieModel.findMovieByApiId(movie.id)
            .then(function (m) {
                if (m === null) {
                    return movieModel.createMovie(movie)
                } else {
                    return m
                }
            })
            .then(function (mov) {
                movieId = mov._id;
                return bookmarkModel.userBookmarksMovie(user, mov)
            })
            .then(function (result) {
                res.send(result);
            })
    }


    function userUnbookmarksMovie(req, res) {
        var movie = req.body;
        var user = req.session['currentUser']
        var movieId;
        movieModel.findMovieByApiId(movie.id)
            .then(function (mov) {
                movieId = mov._id;
                return bookmarkModel.userUnbookmarksMovie(user, mov)
            })
            .then(function (result) {
                res.send(result);
            })

    }


}
;