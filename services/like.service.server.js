module.exports = function (app) {

    app.post('/api/like/movie/add',
        userLikesMovie);
    app.post('/api/like/movie/remove',
        userUnlikesMovie);
    app.get('/api/like/movie/:movieId/check',
        checkLike);
    app.get('/api/like/user/:userId/movie/',
        findAllLikedMoviesForUser);

    var likeModel = require('../models/like/like.model.server');
    var movieModel = require('../models/movie/movie.model.server');


    function checkLike(req, res) {
        var id = req.params['movieId'];
        var user = req.session['currentUser']
        var userId = user._id
        movieModel.findMovieByApiId(id)
            .then(function (m) {
                if (m === null) {
                    res.send(false)
                } else {
                    likeModel.checkLike(userId, m._id)
                        .then(function (like) {
                            if (like === null) {
                                res.send(false)
                            } else {
                                res.send(true)
                            }
                        })
                }
            })

    }

    function findAllLikedMoviesForUser(req, res)
    {
        var userId = req.params['userId']
        likeModel.findLikedMoviesForUser(userId)
            .then(function (result) {
                res.json(result);
            })
    }


    function userLikesMovie(req, res) {
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
                return likeModel.userLikesMovie(user, mov)
            })
            .then(function () {
                return movieModel.incrementMovieLikes(movieId)
            })
            .then(function (result) {
                res.send(result);
            })
    }


    function userUnlikesMovie(req, res) {
        var movie = req.body;
        var user = req.session['currentUser']
        var movieId;
        movieModel.findMovieByApiId(movie.id)
            .then(function (mov) {
                movieId = mov._id;
                return likeModel.userUnlikesMovie(user, mov)
            })
            .then(function () {
                return movieModel.decrementMovieLikes(movieId)
            })
            .then(function (result) {
                res.send(result);
            })

    }


}
;