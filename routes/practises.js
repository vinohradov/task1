var Practise = require('models/practice').Practice;
var Technology = require('models/technology').Technology;

exports.get = function(req, res, next) {
    var page = req.query.page || 0;
    var perPage = page ? 5 : 0;

    Practise
        .find()
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            id: 'asc'
        })
        .exec(function(err, affected) {
            if(err) next(new Error(err));

            res.json(affected);
        });
};

exports.getTechnologies = function(req, res, next) {
    var practiceId = req.params.id;
    var page = req.query.page || 0;
    var perPage = page ? 5 : 0;

    Technology
        .find({
            practiceId: practiceId
        })
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            id: 'asc'
        })
        .exec(function(err, affected) {
            if(err) next(new Error(err));

            res.json(affected);
        });
};