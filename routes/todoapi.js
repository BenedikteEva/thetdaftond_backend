var express = require('express');
var router = express.Router();
var todoFacade = require('../facades/todoFacade')

router.get('/', function (req, res, next) {
    res.render('todoapi', {
      title: "Small Todo app that turned out to be a gigantic monster requiring a backend"
    })
  });
  
  
  router.get('/alltodos',async function (req, res, next) {
    let alltodos = await todoFacade.getAllToDos();
    let alltodosjson=res.json(alltodos);
    
   next();
    res.render('alltodos', {
      title: 'all todos',
      alltodos: alltodosjson
    })
  
  });

  router.put('/todoSetChecked/:_id', async function(req,res,next){
  
    let todo = await todoFacade.setChecked(req.params._id, req.params.checked);
    let todojson=res.json(todo);
  
    res.render('todoSetChecked', {
      title :'todo',
     
      message:"todo succesfully updated"
  
    })
     
  });

  router.post('/todocreate', async function(req,res,next){
 
    let todo =  await todoFacade.addToDo(req.body);
  
  
    todo.save((err,todo) => {
      if(err) {
          res.send(err);
      }
      else { //If no errors, send it back to the client
          res.json({message: "todo successfully added!", todo });
       
      }
  
    })
     
  });

  router.delete('/tododelete',async function(req,res,next){
  
    await todoFacade.deleteTodo(req.params._id);
  
  
    res.render('todobyid', {
      title:'todobyid',
      todo: 'todo has succesfully been deleted',
    
  
  
    })
     
  })

  module.exports = router;