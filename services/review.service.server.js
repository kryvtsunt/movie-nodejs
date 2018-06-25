module.exports = function (app) {

    app.get('/api/review/movie/:movieId', findAllReviews);
    app.post('/api/review/movie/:movieId', userReviewsMovie);
    app.delete('/api/review/movie/:movieId', userDeleteReview);


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
        var user = req.session['currentUser']
        var userId = user._id;
        var movieId;
        var type = 'review'
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
                return reviewModel.userReviewsMovie(user, mov, review)
            })
            .then(function () {
                return movieModel.incrementMovieReviews(movieId)
            })
            .then(function () {
                return activityModel.addActivity(userId, movieId, type)
            })
            .then(function (result) {
                res.send(result);
            })
    }

    function userDeleteReview(req, res){
        var body = req.body;
        var review = body.review;
        var user = req.session['currentUser']
        var userId = user._id;
        var apiId = req.params['movieId']
        var movieId;
        var type = 'delete review'
        movieModel.findMovieByApiId(apiId)
            .then(function (mov) {
                movieId = mov._id
                return reviewModel.userUnReviewsMovie(userId, mov._id, review)
            })
            .then(function () {
                return movieModel.decrementMovieReviews(movieId)
            })
            .then(function () {
                return activityModel.addActivity(userId, movieId, type)
            })
            .then(function (result) {
                res.send(result);
            })

    }
}
