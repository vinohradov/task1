var express = require('express');
var checkToken = require('middleware/checkToken');
var HttpError = require('error').HttpError;

module.exports = function(app){

    app.all('/*', checkToken);

    app.get('/practices', require('./practises').get);
    app.get('/practices/:id/technologies', require('./practises').getTechnologies);
};
