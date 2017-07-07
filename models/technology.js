var mongoose = require('lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    practiceId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

schema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.__v;
    delete obj._id;
    return obj;
};

exports.Technology = mongoose.model('Technology', schema);



