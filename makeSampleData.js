require("./dbSetup.js")();
var mongoose = require('mongoose');
var db = mongoose.connection;
var Project = require("./models/Project.js");
var Todo = require("./models/Todo.js");
var Feedback= require("./models/Feedback.js")


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
function feedbackcreator(purpose, message,level){
  var feedback=new Feedback({purpose:purpose, message:message, level:level});
  return feedback;
}


async function createTodosandProjects() {
  await Todo.deleteMany({});
  await Project.deleteMany({});
  await Feedback.deleteMany({});
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

  const inititalFeedback =[feedbackcreator('Progress', 'What you did today', 0),feedbackcreator('Progress', "What you didn't do today", 0)
,feedbackcreator('Progress', 'What you did today', 1),feedbackcreator('Progress', "What you didn't do today", -1),feedbackcreator('Progress', 'Wow! amazing what you did', 2),
feedbackcreator('Progress', 'You suck!', -2),feedbackcreator('Tomorrow', 'What will you do tomorrow', 0),feedbackcreator('Tomorrow', 'What will you do tomorrow to make your day even more interesting?', 1)
,feedbackcreator('Tomorrow', "i'm so exited to find out what your doing tomorrow", 0),feedbackcreator('Tomorrow', 'you have a lot of unfinished business you could add more',-1),feedbackcreator('Tomorrow', 'Why bother adding anything, your dreams wont come true anyway', -2)]
await Feedback.insertMany([...inititalFeedback])
 
  } catch (err) {
    console.log("UPPPS: ", err);
}


}
createTodosandProjects();


