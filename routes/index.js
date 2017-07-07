var express = require('express');
var checkToken = require('middleware/checkToken');
var HttpError = require('error').HttpError;

module.exports = function(app){
    app.get('/tokens', require('./tokens').get);

    app.get('/practices',checkToken, require('./practises').get);
    app.get('/practices/:id/technologies',checkToken, require('./practises').getTechnologies);

    app.get('*', function(req, res){
        res.send(new HttpError(404))
    });
};
