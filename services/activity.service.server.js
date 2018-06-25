module.exports = function (app) {

    app.post('/api/activity',
        userActivitysMovie);
    app.delete('/api/activity',
        userUnactivitysMovie);
    app.get('/api/activity/user/:userId/',
        findAllActivitydMoviesForUser);
    app.get('/api/activity', findAllActivities)

    var activityModel = require('../models/activity/activity.model.server');
    var movieModel = require('../models/movie/movie.model.server');

    function findAllActivities(req, res){
        activityModel.findAllActivities()
            .then(function(activities){
                res.json(activities)
            })
    }

    function checkActivity(req, res) {
        var id = req.params['movieId'];
        var user = req.session['currentUser']
        var userId = user._id
        movieModel.findMovieByApiId(id)
            .then(function (m) {
                if (m === null) {
                    res.send(false)
                } else {
                    activityModel.checkActivity(userId, m._id)
                        .then(function (activity) {
                            if (activity === null) {
                                res.send(false)
                            } else {
                                res.send(true)
                            }
                        })
                }
            })

    }

    function findAllActivitydMoviesForUser(req, res)
    {
        var userId = req.params['userId']
        activityModel.findActivitydMoviesForUser(userId)
            .then(function (result) {
                res.json(result);
            })
    }


    function userActivitysMovie(req, res) {
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
                return activityModel.userActivitysMovie(user, mov)
            })
            .then(function () {
                return movieModel.incrementMovieActivitys(movieId)
            })
            .then(function (result) {
                res.send(result);
            })
    }


    function userUnactivitysMovie(req, res) {
        var movie = req.body;
        var user = req.session['currentUser']
        var movieId;
        movieModel.findMovieByApiId(movie.id)
            .then(function (mov) {
                movieId = mov._id;
                return activityModel.userUnactivitysMovie(user, mov)
            })
            .then(function () {
                return movieModel.decrementMovieActivitys(movieId)
            })
            .then(function (result) {
                res.send(result);
            })

    }


}
;