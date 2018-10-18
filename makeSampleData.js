require("./dbSetup.js")();
var mongoose = require('mongoose');
var db = mongoose.connection;
var User = require("./models/User.js");
var Project = require("./models/Project.js");
var Todo = require("./models/Todo.js");


// laver jobs som en liste hvis vi gerne vil have en jobcollection senere. 
const joblist = [
  { type: "Owner", company: "Mycompany", companyUrl: "www.mycompany.com" },
  { type: "Secretary", company: "Mycompany", companyUrl: "www.mycompany.com" },
  { type: "Janitor", company: "MyOtherCompany", companyUrl: "www.myothercompany.com" },
  { type: "Owner", company: "MyOthercompany", companyUrl: "www.myothercompany.com" }


]

const userlist = [
  { firstName: 'Sweetie', lastName: 'Sweetums', userName: 'Sweetie', password: "sweetie", email: "sweetie@sweets.on", job: joblist[0] },
  { firstName: 'Hardie', lastName: 'Hards', userName: 'Hardie', password: "hardie", email: "hardie@hards.on", job: joblist[1] },
  { firstName: 'Crazy', lastName: 'Crazed', userName: 'Crazy', password: "crazed", email: "crazy@crazed.on", job: joblist[2] },
  { firstName: 'Mons', lastName: 'Monster', userName: 'MonsterMons', password: "mons", email: "monster@mons.on", job: joblist[3] },

];





// Here we will setup users
async function createUsers() {
await User.deleteMany({});
await Todo.deleteMany({});
await Project.deleteMany({});


  return await db.collection('users').insertMany([
    userlist[0], userlist[1], userlist[2], userlist[3]
  ]);//use foreach if more testdata needed
}


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
  try {
  const userPromises=[createUsers()]
  var users = await Promise.all(userPromises);


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


