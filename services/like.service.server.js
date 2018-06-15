module.exports = function (app) {

    app.post('/api/like/movie',
        userLikesMovie);
    app.get('/api/like/movie/:movieId',
        checkLike);

    var likeModel = require('../models/like/like.model.server');
    var movieModel = require('../models/movie/movie.model.server');


    function checkLike(req, res){
        var id = req.params['movieId'];
        var user = req.session['currentUser']
        var userId = user._id
        movieModel.findMovieByApiId(id)
            .then (function(m){
                if (m === null){
                    res.send(false)
                }else {
                    likeModel.checkLike(userId, m._id)
                        .then(function(like){
                            if (like === null){
                                res.send(false)
                            }else {
                                res.send(true)
                            }
                        })
                }
            })

    }

    function userLikesMovie(req, res) {
        var movie = req.body;
        var user = req.session['currentUser']
        var userId = user._id
        movieModel.findMovieByApiId(movie.id)
            .then(function (m) {
                    if (m !== null) {
                        likeModel.userLikesMovie(userId, m._id)
                            .then(function () {
                                movieModel.incrementMovieLikes(m._id)
                            })
                            .then(function (result) {
                                res.send(result);
                            })
                    }
                    else {
                        movieModel.createMovie(movie)
                            .then(function (movie) {
                                likeModel.userLikesMovie(userId, movie._id)
                            })
                            .then(function () {
                                movieModel.incrementMovieLikes(m._id)
                            })
                            .then(function (result) {
                                res.send(result);
                            })
                    }
                }
            )

    }
}
;