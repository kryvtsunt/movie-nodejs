module.exports = function (app) {

  app.post('/api/movie', createMovie);

  var movieModel = require('../models/movie/movie.model.server');
  var liketModel = require('../models/like/like.model.server');

  function createMovie(req, res) {

    sectionModel
      .findSectionsForCourse(courseId)
      .then(function (sections) {
        res.json(sections);
      })

      var movie = req.body;
      movieModel.createMovie(movie)
          .then(function (movie) {
              res.send(movie);
          })
  }

};