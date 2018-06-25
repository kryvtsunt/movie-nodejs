var mongoose = require('mongoose');
var activitySchema = require('./activity.schema.server');
var activityModel = mongoose.model(
    'ActivityModel',
    activitySchema
);


function findAllActivities() {
    return activityModel.find()
        .populate('movie')
        .populate('user')
        .exec();
}

function addActivity(Id, Id2, type) {
    var date = new Date();
    var activity;
    if (type === 'follow' || type === 'unfollow') {
        activity = {
            user: Id,
            user2: Id2,
            type: type,
            date: date
        };
    }
    else {
        activity = {
            user: Id,
            movie: Id2,
            type: type,
            date: date
        };
    }
    return activityModel.create(activity);
}

function findActivitydMoviesForUser(userId) {
    return activityModel
        .find({user: userId})
        .populate('movie')
        .exec();
}

function findUsersforActivitydMovie(movieId) {
    return activityModel
        .find({movie: movieId})
        .populate('user')
        .exec();
}

function checkActivity(userId, movieId) {
    var activity = {
        user: userId,
        movie: movieId
    }
    return activityModel.findOne(activity);
}

function deleteMovie(id){
    return activityModel.remove({movie: id})
}

function deleteUser1(id){
    return activityModel.remove({user: id})

}

function deleteUser2(id){
    return activityModel.remove({user2: id})

}


module.exports = {
    findAllActivities: findAllActivities,
    addActivity: addActivity,
    findActivitydMoviesForUser: findActivitydMoviesForUser,
    findUsersforActivitydMovie: findUsersforActivitydMovie,
    checkActivity: checkActivity,
    deleteMovie: deleteMovie,
    deleteUser1: deleteUser1,
    deleteUser2: deleteUser2
};