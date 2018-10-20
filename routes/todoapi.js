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


  router.put('/todosetchecked/:_id', async function(req,res, next){
    let todo= await todoFacade.setChecked({_id:req.params._id}, req.body.checked);
   todo.save((err,user, done) => {
      if(err) {
          res.send(err);
      }
      else { //If no errors, send it back to the client
        res.render('todosetchecked', {
          message :'changed checked status'
        
     
        }) 
      } done();
    
    })
    })

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