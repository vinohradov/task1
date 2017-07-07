var mongoose = require('mongoose');
var config = require('config');
mongoose.Promise = global.Promise;

mongoose.connect(config.get('mongoose:uri'), {useMongoClient: true});

module.exports = mongoose;
