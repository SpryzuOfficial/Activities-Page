const {Schema, model} = require('mongoose');

const ActivitySchema = new Schema({
    "name": {
        type: String,
        required: true
    },
    "description": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: false
    }
});

ActivitySchema.methods.toJSON = function()
{
    const {__v, ...activity} = this.toObject();

    return activity;
}

module.exports = model('Activity', ActivitySchema);