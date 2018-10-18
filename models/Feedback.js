var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
    title: String,
    message: String,
    id: Number,
    level: Number,

});


module.exports = mongoose.model('Feedback', feedbackSchema);