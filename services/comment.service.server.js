module.exports = function (app) {

    app.get('/api/comment/movie/:movieId/find', findAllComments);
    app.post('/api/comment/movie/:movieId/add', userCommentsMovie);


    var commentModel = require('../models/comment/comment.model.server');
    var movieModel = require('../models/movie/movie.model.server');


    function findAllComments(req, res) {
        var id = req.params['movieId'];
        movieModel.findMovieByApiId(id)
            .then(function (m) {
                if (m === null) {
                    res.send([])
                } else {
                    commentModel.findAllComments(m._id)
                        .then(function (comments) {
                            res.send(comments)
                        })
                }
            })

    }

    function userCommentsMovie(req, res) {
        var body = req.body;
        var comment = body.comment;
        var movie = body.movie;
        var movieId = req.params['movieId'];
        var user = req.session['currentUser']
        var userId = user._id
        movieModel.findMovieByApiId(movieId)
            .then(function (m) {
                    if (m !== null) {
                        commentModel.userCommentsMovie(user, m, comment)
                            .then(function () {
                                movieModel.incrementMovieComments(m._id)
                            })
                            .then(function (result) {
                                res.send(result);
                            })
                    }
                    else {
                        movieModel.createMovie(movie)
                            .then(function (m) {
                                commentModel.userCommentsMovie(user, m, comment)
                            })
                            .then(function () {
                                movieModel.incrementMovieComments(m._id)
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