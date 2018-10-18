var mongoose = require('mongoose');
require("..//dbSetup.js")();
var db = mongoose.connection;
var projects = require('../models/Project.js');
var Project = mongoose.model('Project', projects.projectschema);




  addProject = async (Project) => {
   return  await Project.create(Project);
  }

  getAllprojects =async () =>{

 return await Project.find({})
    }

    setChecked= async(_id, checked)=>{
      return await Project.findByIdAndUpdate(_id,{$set:{checked:checked}}, function (err, tank) {
        if (err) return handleError(err);
        res.send(tank);
      });
    }

    updateProjectDescription=async(_id, description)=>{
        return await Project.findByIdAndUpdate(_id, {$set:{description:description}}, function (err, tank) {
            if (err) return handleError(err);
            res.send(tank);
          });
        
    }

    deleteProject=async (id)=>{
      return await Project.findByIdAndDelete(id);
    }
   


module.exports={
  addProject:addProject,
  getAllprojects:getAllprojects,
  setChecked:setChecked,
  deleteProject:deleteProject,
  updateProjectDescription:updateProjectDescription
}