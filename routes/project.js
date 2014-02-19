var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  models.Project
    .find({"_id" : projectID})
    .sort('-date')
    .exec(afterQuery);

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  // make a new Project and save it to the DB
  var newProject = new models.Project({
    "title": form_data.title,
    "date": form_data.date,
    "summary": form_data.summary,
    "image": form_data.image
  });
  newProject.save(afterSaving);

  function afterSaving(err) {
    if(err) {console.log(err); res.send(500); }
    res.redirect('/');
  }
  // YOU MUST send an OK response w/ res.send();
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  // find the project and remove it
  models.Project
    .find({"_id": projectID})
    .remove()
    .exec(afterRemoving);

  // YOU MUST send an OK response w/ res.send();
  function afterRemoving(err) {
    if(err) {console.log(err); res.send(500); }
  }
}