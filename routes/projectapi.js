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

  router.put('/projectSetChecked/:_id', async function(req,res,next){
  
    let project = await projectFacade.setChecked(req.params._id);
    let projectjson=res.json(project);
  
    res.render('projectSetChecked', {
      title :'project',
     
      project: projectjson
  
    })
     
  });

  router.post('/projectcreate/:project', async function(req,res,next){
 
    let newproject =  await projectFacade.addproject(req.body);
  
   
    res.render('projectcreate', {
      title :'projectcreate',
      message: 'successfully created project'
     
   
  
    })
     
  });
  router.delete('/projectdelete/:_id',async function(req,res,next){
  
    await projectFacade.deleteproject(req.params._id);
  
  
    res.render('projectbyid', {
      title:'projectbyid',
      project: 'project has succesfully been deleted',
    
  
  
    })
     
  })

  module.exports = router;