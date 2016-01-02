var express              = require("express"),
      app                    = express(),
      bodyParser        = require('body-parser'),
      mongoose         = require('mongoose'),
      todosController = require('./server/controller/todos-controller');

mongoose.connect('mongodb://localhost:27017/todoListApp');

app.use(express.static(__dirname + "/src"));
app.use(bodyParser.json());

// REST API
app.get('/api/todos/all', todosController.all);
app.post('/api/todos/create', todosController.create);
app.post('/api/todos/delete', todosController.delete);

app.listen(3000);
console.log("Server running on port 3000");