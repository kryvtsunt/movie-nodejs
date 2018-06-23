module.exports = function (app) {

    app.get('/api/movie/:movieId', findMovie);
    app.delete('/api/movie/:movieId', deleteMovie);
    app.put('/api/movie/:movieId', updateMovie);
    app.get('/api/movie/', findAllMovies);

    var movieModel = require('../models/movie/movie.model.server');


    function findMovie(req, res) {
        var id = req.params['movieId'];
        movieModel.findMovieByApiId(id)
            .then(function (movie) {
                res.json(movie)
            });

    }

    function findAllMovies(req, res){
        movieModel.findAllMovies()
            .then(function (movies) {
                res.json(movies)
            });
    }

    function updateMovie(req, res) {
        var movie = req.body;
        var id = req.params['movieId']
        movieModel.updateMovie(id, movie)
            .then(function () {
                res.json(movie);
            })
    }

    function deleteMovie(req, res) {
        var id = req.params['movieId'];
        movieModel.deleteMovie(id)
            .then(function (movie) {
                res.json(movie);
            })
    }
};