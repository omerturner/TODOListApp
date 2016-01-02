var Todo = require('../model/todos');

module.exports.all = function (req, res) {
  Todo.find({}, function (err, results) {
    res.json(results);
  });
}

module.exports.create = function (req, res) {
  var todo = new Todo(req.body);

  // Convert the Model instance to a simple object using Model's 'toObject' function
  // to prevent weirdness like infinite looping...
  var upsertData = todo.toObject();

  // Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
  delete upsertData._id;

  // Do the upsert, which works like this: If no Todo document exists with
  // _id = todo.id, then create a new doc using upsertData.
  // Otherwise, update the existing doc with upsertData
  Todo.update({_id: todo.id}, upsertData, {upsert: true}, function(err, doc){
     if (err) {
       return res.json({ error: err });
     }
     return res.json(doc);
  });
}

module.exports.delete = function (req, res) {
  Todo.findById(req.body._id, function (err, doc) {
    if (err) {
       return res.json({ error: err });
     }
     return res.json(doc);
  }).remove().exec();
}