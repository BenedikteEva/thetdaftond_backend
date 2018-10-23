var mongoose = require('mongoose');
require("..//dbSetup.js")();
var db = mongoose.connection;
var feedbacks = require('../models/Feedback.js');
var Feedback = mongoose.model('Feedback', feedbacks.feedbackSchema);

async function addFeedback(Feedback) {
    return await Feedback.create(feedback);
  }
  
  getAllFeedbacks = async () => {
    return await Feedback.find({})
  }
  
  deleteFeedback = async (_id) => {
    return await Feedback.findByIdAndDelete(_id).exec();
  }
  
  
  
  module.exports = {
    addFeedback: addFeedback,
    getAllFeedbacks: getAllFeedbacks,
    deleteFeedback: deleteFeedback
  }