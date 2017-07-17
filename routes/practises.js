var Practise = require('models/practice').Practice;
var Technology = require('models/technology').Technology;

exports.get = function(req, res, next) {
    var page = req.query.page || 1;
    var perPage = page ? 5 : 0;

    Practise.paginate({}, { page: page, limit: perPage }, function(err, result){
        if(err) {
            return next(new Error(err));
        }

        res.json({
            data: result.docs,
            total: result.total
        });
    })
};

exports.getTechnologies = function(req, res, next) {
    var practiceId = req.params.id;
    var page = req.query.page || 1;
    var perPage = page ? 5 : 0;

    Technology.paginate({ practiceId: practiceId }, { page: page, limit: perPage }, function(err, result){
        if(err) {
            return next(new Error(err));
        }

        res.json({
            data: result.docs,
            total: result.total
        });
    })
};