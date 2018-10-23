var express = require('express');
var router = express.Router();
var feedbackFacade = require('../facades/feedbackFacade')








router.get('/', function (req, res, next) {
    res.render('feedbackapi', {
      title: "Small feedback app that turned out to be a gigantic monster requiring a backend"
    })
  });
  
  
  router.get('/allfeedbacks',async function (req, res, next) {
    let allfeedbacks = await feedbackFacade.getAllFeedbacks();
    let allfeedbacksjson=res.json(allfeedbacks);

    res.render('allfeedbacks', {
      title: 'all feedbacks',
      allfeedbacks: allfeedbacksjson
    })
  
  });

  router.post('/feedback', async function(req,res,next){
 
    let feedback =  await feedbackFacade.addFeedback(req.body);
  
  
    feedback.save((err,feedback) => {
      if(err) {
          res.send(err);
      }
      else { //If no errors, send it back to the client
          res.json({message: "feedback successfully added!", feedback, title:'feedback' });
       
      }
  
    })
     
  });

  router.delete('/feedback/:_id',async function(req,res,next){
  
    await feedbackFacade.deleteFeedback(req.params._id);
  
  
    res.render('feedback', {
      title:'feedbackdelete',
      feedback: 'feedback has succesfully been deleted',
    
  
  
    })
     
  })
 
 
  module.exports = router;
