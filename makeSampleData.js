require("./dbSetup.js")();
var mongoose = require('mongoose');
var db = mongoose.connection;
var User = require("./models/User.js");
var Project = require("./models/Project.js");
var Todo = require("./models/Todo.js");



// utility function til at skabe positioner Jeg var nødt at ændre user til at kunne tage en string istedet for med mindre 
//jeg gerne vil have hele useren embedded og det vil jeg vist nok helst ikke fordi: det fylder mere og det er ikke nødvendigt (håber jeg) 
function todoCreator(title, projectid, id) {

  var todo = new Todo({title:title,projectid: projectid,id: id});
  return todo;
}
function projectCreator(title, description, id) {
 
  var project = new Project({title:title,description:description, id: id});
  return project;
}


async function createTodosandProjects() {
  await Todo.deleteMany({});
  await Project.deleteMany({});
  try {



  const todotutorial =[todoCreator('add todo', 0, 0), todoCreator('check todo', 0,1), todoCreator('drag and drop checked todo into the black hole', 0, 2)]


  await Todo.insertMany([
    todotutorial[0],
    todotutorial[1],
    todotutorial[2],
   
  ]);

  const sampleProjects =[projectCreator('Do todo tutorial','This is project zero and when you have finished this you know how to use this app.', 0)]

  await Project.insertMany([
   sampleProjects[0]
   
  ]);

 
  } catch (err) {
    console.log("UPPPS: ", err);
}


}
createTodosandProjects();


