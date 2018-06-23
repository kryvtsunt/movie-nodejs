var mongoose = require('mongoose');
var followSchema = mongoose.Schema({
    follower: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    following: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
}, {collection: 'follow'});
module.exports = followSchema;

