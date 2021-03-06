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

    res.render('alltodos', {
      title: 'all todos',
      alltodos: alltodosjson
    })
  
  });


  router.put('/todosetchecked/:_id', async function(req,res, next){
    let todo= await todoFacade.setChecked(req.params._id, req.body.checked);
  
    res.render('todosetchecked', {
      title: 'todo set checked',
      message: 'changed checked'
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

  router.delete('/delete/:_id',async function(req,res,next){
  
    await todoFacade.deleteTodo(req.params._id);
  
  
    res.render('delete', {
      message:'tododelete',
    
    
  
  
    })
     
  })

  module.exports = router;