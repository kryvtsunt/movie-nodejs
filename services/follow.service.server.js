module.exports = function (app) {

    app.post('/api/follow/following/:userId', userFollows);
    app.delete('/api/follow/following/:userId', userUnfollows);
    app.get('/api/follow/followings', findAllFollowings)
    app.get('/api/follow/followers', findAllFollowers)

    var followModel = require('../models/follow/follow.model.server');
    var movieModel = require('../models/movie/movie.model.server');

    function findAllFollowings(req, res){
        followModel.findFollowings()
            .then(function(response){
                res.json(response)
            })
    }

    function findAllFollowers(req, res){
        followModel.findFollowers()
            .then(function(response){
                res.json(response)
            })
    }

    function userFollows(req, res){
        var user = req.session['currentUser']
        var userId = user._id
        var user2Id = req.body;
        followModel.addFollow(userId, user2Id)
            .then(function(response){
                res.json(response)
            })
    }

    function userUnfollows(req, res){
        var user = req.session['currentUser']
        var userId = user._id
        var user2Id = req.body;
        followModel.addFollow(userId, user2Id)
            .then(function(response){
                res.json(response)
            })
    }


}
;