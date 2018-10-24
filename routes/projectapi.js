var express = require('express');
var router = express.Router();
var projectFacade = require('../facades/projectFacade')

router.get('/', function (req, res, next) {
    res.render('projectapi', {
      title: "Small project app that turned out to be a gigantic monster requiring a backend"
    })
  });
  
  
  router.get('/allprojects',async function (req, res, next) {
    let allprojects = await projectFacade.getAllprojects();
    let allprojectsjson=res.json(allprojects);
    
   next();
    res.render('allprojects', {
      title: 'all projects',
      allprojects: allprojectsjson
    })
  
  });

  router.put('/projectsetchecked/:_id', async function(req,res,next){
  
    let project = await projectFacade.setChecked(req.params._id, req.body.checked);
    let projectjson=res.json(project);
  
    res.render('projectsetchecked', {
      title :'project',
     
      project: projectjson
  
    })
     
  });

  router.post('/projectcreate', async function(req,res,next){
 
    let newproject =  await projectFacade.addProject(req.body);
  
   
    newproject.save((err,project) => {
      if(err) {
          res.send(err);
      }
      else { //If no errors, send it back to the client
          res.json({message: "project successfully added!", project });
      }
  
    })
     
  });

  router.delete('/delete/:_id',async function(req,res,next){
  
    await projectFacade.deleteProject(req.params._id);
  
  
    res.render('delete', {
   
      message: 'project has succesfully been deleted',
    
    })
     
  })

  module.exports = router;