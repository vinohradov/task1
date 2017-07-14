var User = require('models/user').User;
var HttpError = require('error').HttpError;
var AuthError = require('models/user').AuthError;
var async = require('async');

/*todo: move logic to CheckToken middleware*/
exports.get = function(req, res) {


    User.authorize(email, function(err, user){
        if (err) {
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }

        req.session.user = user._id;
        res.send({ message: "authorized" });

    });
};

exports.post = function(req, res, next) {
    var email = req.body.email;
    var token = req.token;

    User.authorize(username, password, function(err, user) {
        if (err) {
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }

        req.session.user = user._id;
        res.send({ message: "authorized" });

    });
};