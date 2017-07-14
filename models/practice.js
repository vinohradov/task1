var mongoose = require('lib/mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;

var schema = new Schema({
    id: {
        type: String,
        unique: true,
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

schema.plugin(mongoosePaginate);

exports.Practice = mongoose.model('Practice', schema);



