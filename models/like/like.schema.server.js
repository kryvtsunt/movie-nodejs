var mongoose = require('mongoose');
var likeSchema = mongoose.Schema({
  movie: {type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'},
  student: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
  // grade: String
});
module.exports = likeSchema;