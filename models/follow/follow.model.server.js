var mongoose = require('mongoose');
var followSchema = require('./follow.schema.server');
var followModel = mongoose.model(
    'FollowModel',
    followSchema
);


function findAllConnections(){
    return followModel.find()
        .populate('follower')
        .populate('following')
        .exec();
}

function addFollow(userId, user2Id){
    var follow = {
        follower: userId,
        following: user2Id,
    };
    return followModel.create(follow);
}

function removeFollow(userId, user2Id){
    var follow = {
        follower: userId,
        following: user2Id,
    };
    return followModel.remove(follow);
}

function checkFollowing(userId, user2Id){
    var follow = {
        follower: userId,
        following: user2Id,
    };
    return followModel.findOne(follow);
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

function deleteUser1(userId){
    return followModel.remove({follower: userId})
}

function deleteUser2(userId){
    return followModel.remove({following: userId})
}

module.exports = {
    findAllConnections: findAllConnections,
    addFollow: addFollow,
    removeFollow: removeFollow,
    findFollowings: findFollowings,
    findFollowers: findFollowers,
    checkFollowing: checkFollowing,
    deleteUser1: deleteUser1,
    deleteUser2: deleteUser2

};