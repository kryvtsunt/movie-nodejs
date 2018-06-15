module.exports = function (app) {

    app.post('/api/like/user/:userId/movie/:movieId',
        userLikesMovie);

    var likeModel = require('../models/like/like.model.server');

    function userLikesMovie(req, res) {
        likeModel.userLikesMovie(
            req.params.userId,
            req.params.movieId)
            .then(function (like) {
                res.json(like);
            });
    }
};