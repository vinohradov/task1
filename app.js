var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var HttpError = require('error').HttpError;
var bearerToken = require('express-bearer-token');

var http = require('http');

require('./lib/mongoose');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use(bearerToken());

app.use(require('middleware/sendHttpError'));
require('routes')(app);

// error handler
app.use(function(err, req, res, next) {
    if (typeof err === 'number') {
        err = new HttpError(err);
    }

    res.sendHttpError(err);
});

var server = http.createServer(app);


server.listen(9000);
server.on('listening', onListening);



function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}

module.exports = app;
