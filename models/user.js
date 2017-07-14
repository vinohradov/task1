var crypto = require('crypto');
var async = require('async');
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
/*todo: move logic to checkToken middleware*/
schema.statics.authorize = function(username, password, callback) {
  var User = this;

  async.waterfall([
    function(callback) {
      User.findOne({username: username}, callback);
    },
    function(user, callback) {
      if (user) {
        //if user with current email exist
        //....
      }
    }
  ], callback);
};

exports.User = mongoose.model('User', schema);


function AuthError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, AuthError);

  this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;


