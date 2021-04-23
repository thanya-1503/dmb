var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usersSchema = new Schema({
  username: { type: String },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String }
}, {
    strict: false,
    versionKey: false
  });

var user = mongoose.model('users', usersSchema, 'users');

module.exports = user;