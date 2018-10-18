var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  title: String,
  description: String,
  id: Number,
  checked: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  expires: Date
});

// Build the User model
module.exports =mongoose.model('Project', projectSchema);