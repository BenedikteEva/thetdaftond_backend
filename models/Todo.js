var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var projectScema=require('./Project');
var todoSchema = new Schema({
  title: String,
  id: Number,
  checked: { type: Boolean, default: false},
  projectid: Number,
  created: { type: Date, default: Date.now },
  expires: Date
});


// Build the User model
module.exports = mongoose.model('Todo', todoSchema);

