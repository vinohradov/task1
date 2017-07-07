var mongoose = require('lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    }
});

schema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.__v;
    delete obj._id;
    return obj;
};

exports.Token = mongoose.model('Token', schema);



