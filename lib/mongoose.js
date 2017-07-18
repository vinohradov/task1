var mongoose = require('mongoose');
var config = require('config');
var uri, options;

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
    uri = config.get('mongoose:dev:uri');
    options = config.get('mongoose:dev:options');
} else {
    uri = config.get('mongoose:prod:uri');
    options = config.get('mongoose:dev:options');
}

mongoose.connect(uri, options);

module.exports = mongoose;
