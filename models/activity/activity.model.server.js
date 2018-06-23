var mongoose = require('mongoose');
var activitySchema = require('./activity.schema.server');
var activityModel = mongoose.model(
    'ActivityModel',
    activitySchema
);


function findAllActivities(){
    return activityModel.find()
        .populate('movie')
        .populate('user')
        .exec();
}

function addActivity(userId, movieId, type){
    var date = new Date();
    var activity = {
        user: userId,
        movie: movieId,
        type: type,
        date: date
    };
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


module.exports = {
    findAllActivities: findAllActivities,
    addActivity: addActivity,
    findActivitydMoviesForUser: findActivitydMoviesForUser,
    findUsersforActivitydMovie: findUsersforActivitydMovie,
    checkActivity: checkActivity,
};