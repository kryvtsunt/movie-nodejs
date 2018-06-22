module.exports = function (app) {

    app.get('/api/movie/:movieId', findMovie);
    app.get('/api/movie/', findAllMovies);

    var movieModel = require('../models/movie/movie.model.server');


    function findMovie(req, res) {
        var id = req.params['movieId'];
        movieModel.findMovieByApiId(id)
            .then(function (movie) {
                res.send({movie: movie})
            });

    }

    function findAllMovies(req, res){
        movieModel.findAllMovies()
            .then(function (movies) {
                res.json(movies)
            });
    }
};