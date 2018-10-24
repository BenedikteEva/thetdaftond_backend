var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
    purpose: String,
    message: String,
    created: { type: Date, default: Date.now },
    id: Number,
    level: Number,

});


module.exports = mongoose.model('Feedback', feedbackSchema);