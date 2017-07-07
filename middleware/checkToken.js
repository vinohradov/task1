var HttpError = require('error').HttpError;
var Token = require('models/token').Token;

module.exports = function(req, res, next) {
    var token = req.headers['x-access-token'];

    if (!token) {
        return next(new HttpError(401, "No token provided"));
    }

    Token.find({ id: token }).exec(function (err, affected) {
        if (err) {
            next(new Error(err));
        }
        if (!affected.length) {
            return next(new HttpError(401, "No token provided"));
        }

        next();
    });
};