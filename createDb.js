var mongoose = require('lib/mongoose');
var config = require('config');
var async = require('async');

async.series([
    open,
    dropDatabase,
    requireModels,
    createPractices,
    createTechnologies,
    generateTokens
], function (err) {
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('models/practice');
    require('models/technology');
    require('models/token');
    async.each(Object.keys(mongoose.models), function (modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createPractices(callback) {
    var practices = [
        { id: '1', name: 'Node js', description: 'You can learn Node' },
        { id: '2', name: 'Angular', description: 'You can learn Angular' },
        { id: '3', name: 'React', description: 'You can learn React' },
        { id: '4', name: 'RxJs', description: 'You can learn RxJs' },
        { id: '5', name: 'Ember', description: 'You can learn Ember' },
        { id: '6', name: 'Express js', description: 'You can learn Express' }
    ];
    async.each(practices, function (practiceData, callback) {
        var practice = new mongoose.models.Practice(practiceData);
        practice.save(callback);
    }, callback);
}

function createTechnologies(callback) {
    var technologies = [
        { id: '1', practiceId: '1', name: 'Async', description: 'You can learn Async' },
        { id: '2', practiceId: '1', name: 'Promise', description: 'You can learn Promise' },
        { id: '3', practiceId: '1', name: 'Router', description: 'You can learn Router' },
        { id: '4', practiceId: '1', name: 'Debugger', description: 'You can learn Debugger' },
        { id: '5', practiceId: '1', name: 'Modules', description: 'You can learn Modules' },
        { id: '6', practiceId: '1', name: 'Middlewarse', description: 'You can learn Middlewarse' },
        { id: '7', practiceId: '2', name: 'Angular basics', description: 'You can learn basics' },
        { id: '8', practiceId: '3', name: 'React basics', description: 'You can learn basics' },
        { id: '9', practiceId: '4', name: 'rxjs basics', description: 'You can learn basics' },
        { id: '10', practiceId: '5', name: 'Ember basics', description: 'You can learn basics' },
        { id: '11', practiceId: '5', name: 'Ember basics level 2', description: 'You can learn basics lvl2' }
    ];
    async.each(technologies, function (technologyData, callback) {
        var technology = new mongoose.models.Technology(technologyData);
        technology.save(callback);
    }, callback);
}

function generateTokens(callback) {
    var tokens = [
        { id: guid() },
        { id: guid() },
        { id: guid() }
    ];
    async.each(tokens, function (tokenData, callback) {
        var tokens = new mongoose.models.Token(tokenData);
        tokens.save(callback);
    }, callback);
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}