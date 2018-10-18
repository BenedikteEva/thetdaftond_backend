var express = require('express');
var router = express.Router();
const userFacade = require('../facades/userFacade')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('api', {
    title: "Mini Project Part 1 full stack js api"
  })
});


router.get('/allusers',async function (req, res, next) {
  let allusers = await userFacade.getAllUsers();
  let allusersjson=res.json(allusers);
  
 
  res.render('allusers', {
    title: 'all users',
    allusers: allusersjson
  })

});
router.get('/userbyname/:userName', async function(req,res,next){
  let user = await userFacade.findByUsername(req.params.userName);
  let userjson=res.json(user);

  res.render('userbyname', {
    title :'user',
    user: userjson

  })
});
router.get('/userbyid/:_id', async function(req,res,next){
  
  let user = await userFacade.findById(req.params._id);
  let userjson=res.json(user);

  res.render('userbyid', {
    title :'user',
    user: userjson

  })
   
});

router.post('/usercreate', async function(req,res,next){
 
  let newUser =  await userFacade.addUser(req.body.firstName, req.body.lastName, req.body.userName, req.body.password, req.body.email, req.body.type, req.body.company, req.body.companyUrl);

 
  newUser.save((err,user) => {
    if(err) {
        res.send(err);
    }
    else { //If no errors, send it back to the client
        res.json({message: "User successfully added!", user });
    }

  })
   
});


router.delete('/userbyid/:_id',async function(req,res,next){
  
  await userFacade.deleteUser(req.params._id);


  res.render('userbyid', {
    title:'userbyid',
    user: 'user has succesfully been deleted',
  


  })
   
})

 

module.exports = router;
