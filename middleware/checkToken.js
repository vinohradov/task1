var HttpError = require('error').HttpError;
var User = require('models/user').User;
var crypto = require('crypto.js');

var DELAY_TIME = 4000;

module.exports = function(req, res, next) {
    var token = req.token,
        email = req.headers['from'],
        date = req.headers['now'];

    if (!token) {
        return next(new HttpError(403));
    }
    if (isOutdated(date) ){
        return next(new HttpError(403));
    }

    User.findOne({ email: email }).exec(function (err, user) {
        if (err) {
            return next(new Error(err));
        }
        if (!user) {
            return next(new HttpError(403));
        }
        if (encryptUserToken(user.token, date) !== token) {
            return next(new HttpError(403));
        }

        return next();
    });
};

function encryptUserToken(tokenInDb, date){
    return crypto.encrypt(tokenInDb + date);
}

function isOutdated(date){
    return (new Date() - date) > DELAY_TIME;
}