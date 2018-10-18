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

setChecked = async (_id) => {
  return await Todo.findByIdAndUpdate(_id, { $set: { checked: true } }, function (err, res) {
    if (err) return handleError(err);

  });
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