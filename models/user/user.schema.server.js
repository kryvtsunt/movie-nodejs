var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    img_path: String,
    role: String,
    gender: String,
    dateB: String,
    followers: Number,
    followings: Number
}, {collection: 'user'});

module.exports = userSchema;