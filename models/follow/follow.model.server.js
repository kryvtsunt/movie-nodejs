var mongoose = require('mongoose');
var followSchema = require('./follow.schema.server');
var followModel = mongoose.model(
    'FollowModel',
    followSchema
);


function findAllConnections(){
    return followModel.find()
        .populate('movie')
        .populate('user')
        .exec();
}

function addFollow(userId, user2Id){
    var follow = {
        follower: userId,
        following: movieId,
    };
    return followModel.create(follow);
}

function findFollowers(userId) {
    return followModel
        .find({following: userId})
        .populate('follower')
        .exec();
}

function findFollowings(userId) {
    return followModel
        .find({follower: userId})
        .populate('following')
        .exec();
}

module.exports = {
    findAllConnections: findAllConnections,
    addFollow: addFollow,
    findFollowings: findFollowings,
    findFollowers: findFollowers

};