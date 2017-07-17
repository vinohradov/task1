var util = require('util');

var mongoose = require('lib/mongoose'),
  Schema = mongoose.Schema;

var schema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  token: {
    type: String,
    unique: true
  }
});

exports.User = mongoose.model('User', schema);
