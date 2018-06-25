var mongoose = require('mongoose');
var activitySchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    user2: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    movie: {type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'},
    type: String,
    date: Date
}, {collection: 'activity'});
module.exports = activitySchema;

