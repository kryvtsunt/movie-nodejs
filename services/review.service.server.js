module.exports = function (app) {

    app.get('/api/review/movie/:movieId/find', findAllReviews);
    app.post('/api/review/movie/:movieId/add', userReviewsMovie);


    var reviewModel = require('../models/review/review.model.server');
    var movieModel = require('../models/movie/movie.model.server');
    var activityModel = require('../models/activity/activity.model.server');


    function findAllReviews(req, res) {
        var id = req.params['movieId'];
        movieModel.findMovieByApiId(id)
            .then(function (m) {
                if (m === null) {
                    res.send([])
                } else {
                    reviewModel.findAllReviewsForMovie(m._id)
                        .then(function (reviews) {
                            res.send(reviews)
                        })
                }
            })

    }

    function userReviewsMovie(req, res) {
        var body = req.body;
        var review = body.review;
        var movie = body.movie;
        var movieId = req.params['movieId'];
        var user = req.session['currentUser']
        var userId = user._id;
        var type = 'review'
        movieModel.findMovieByApiId(movieId)
            .then(function (m) {
                    if (m !== null) {
                        reviewModel.userReviewsMovie(user, m, review)
                            .then(function () {
                                movieModel.incrementMovieReviews(m._id)
                            })
                            .then(function (result) {
                                res.send(result);
                            })
                    }
                    else {
                        movieModel.createMovie(movie)
                            .then(function (m) {
                                reviewModel.userReviewsMovie(user, m, review)
                            })
                            .then(function () {
                                movieModel.incrementMovieReviews(m._id)
                            })
                            .then(function(){
                                return activityModel.addActivity(userId, movieId, type)
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