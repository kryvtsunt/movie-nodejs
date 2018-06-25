module.exports = function (app) {

    app.post('/api/follow/following/:userId', userFollows);
    app.get('/api/follow/following/:userId', checkFollowing);
    app.delete('/api/follow/following/:userId', userUnfollows);
    app.get('/api/follow/user/:userId/following', findAllFollowings)
    app.get('/api/follow/user/:userId/follower', findAllFollowers)
    app.get('/api/follow/', findAllConnections)

    var followModel = require('../models/follow/follow.model.server');
    var movieModel = require('../models/movie/movie.model.server');

    function findAllFollowings(req, res){
        var userId = req.params['userId']
        followModel.findFollowings(userId)
            .then(function(response){
                res.json(response)
            })
    }

    function findAllFollowers(req, res){
        var userId = req.params['userId']
        followModel.findFollowers(userId)
            .then(function(response){
                res.json(response)
            })
    }

    function findAllConnections(req, res){
        followModel.findFollowers()
            .then(function(response){
                res.json(response)
            })
    }

    function userFollows(req, res){
        var user = req.session['currentUser']
        var userId = user._id
        var user2Id = req.params['userId']
        followModel.addFollow(userId, user2Id)
            .then(function(response){
                res.json(response)
            })
    }

    function checkFollowing(req, res){
        var user = req.session['currentUser']
        var userId = user._id
        var user2Id = req.params['userId']
        followModel.checkFollowing(userId, user2Id)
            .then(function(response){
                res.json(response)
            })
    }

    function userUnfollows(req, res){
        var user = req.session['currentUser']
        var userId = user._id
        var user2Id = req.params['userId']
        followModel.removeFollow(userId, user2Id)
            .then(function(response){
                res.json(response)
            })
    }


}
;