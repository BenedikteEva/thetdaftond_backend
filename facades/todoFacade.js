var mongoose = require('mongoose');
require("..//dbSetup.js")();
var db = mongoose.connection;
var todos = require('../models/Todo.js');
var Todo = mongoose.model('Todo', todos.todoSchema);






async function addToDo(todo) {

  return await Todo.create(todo);
}

getAllToDos = async () => {

  return await Todo.find({})
}

setChecked = async (_id, checked) => {
  return await Todo.findByIdAndUpdate(_id, { $set: { checked: checked } }).exec();
}

deleteTodo = async (_id) => {
  return await Todo.findByIdAndDelete(_id).exec();
}



module.exports = {
  addToDo: addToDo,
  getAllToDos: getAllToDos,
  setChecked: setChecked,
  deleteTodo: deleteTodo
}