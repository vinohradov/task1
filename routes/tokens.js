var Token = require('models/token').Token;

exports.get = function(req, res) {

    Token
        .find({})
        .exec(function(err, affected) {
            if(err) next(new Error(err));

            res.json(affected);
        });
};