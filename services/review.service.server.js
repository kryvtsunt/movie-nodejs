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
}
