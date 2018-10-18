const mongoose = require("mongoose");
const expect = require("chai").expect;
const dbSetup = require("..//dbSetup");


// //https://github.com/Automattic/mongoose/issues/1251
// mongoose.models = {};
// mongoose.modelSchemas = {};
// mongoose.connection = {};

var todoFacade = require("../facades/todoFacade");
var todos = require('../models/Todo.js');
var Todo = mongoose.model('Todo', todos.todoSchema);
let connection = null;
describe("Testing the todo Facade", function () {

  /* Connect to the TEST-DATABASE */
  before(async function () {
    this.timeout(require("../settings").MOCHA_TEST_TIMEOUT);
    await dbSetup(require("../settings").TEST_DB_URI);
  })

  after(function () {

    mongoose.connection.close();
  })

  var todos = [];
  /* Setup the database in a known state (2 todos) before EACH test */
  beforeEach(async function () {
    await Todo.deleteMany({}).exec();
    todos = await Promise.all([
      new Todo({title: "test add todo",projectid:0,id:1 }).save(),
      new Todo({title: "test todo today",projectid:0,id:2 }).save(),
    ])
  });

  it("Should find all todos (1 ad 2)", async function () {
    var todos = await todoFacade.getAllToDos();
    expect(todos.length).to.be.not.null;
  });



  it("Should add todo 3 find it by its id and then delete it Again", async function () {
    var todo = await todoFacade.addToDo(new Todo({title:"delete test",projectid: 0,id:3}));
   

    expect(todo.title).to.be.equal("delete test");
    var todos = await todoFacade.getAllToDos();
    
  expect(todos.length).to.be.equal(3);
    await todoFacade.deleteTodo(todos[2]._id);
    todos = await todoFacade.getAllToDos();
    expect(todos.length).to.be.equal(2);
  });

  it("Schould  set todo 1's checked to true", async function () {
    var todos= await todoFacade.getAllToDos();

    var newJob = await todoFacade.setChecked(todos[0]._id, true);
    todos= await todoFacade.getAllToDos();
    expect(todos[0].checked).to.be.true;
  })



});

