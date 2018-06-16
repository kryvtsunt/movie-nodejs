module.exports = function (app) {

    app.get('/api/movie/:movieId',
        getMovie);

    var movieModel = require('../models/movie/movie.model.server');


    function getMovie(req, res) {
        var id = req.params['movieId'];
        movieModel.findMovieByApiId(id)
            .then(function (movie) {
                res.send({movie: movie})
            });

    }
};