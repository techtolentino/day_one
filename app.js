var express = require('express');
var port = 3000;
var taskController = require('./controllers/tasksController');

const app = express();

// set up view engine
app.set('view engine', 'ejs');

// static files
app.use('/', express.static('./public'));

// listen to port
app.listen(port);
console.log('You are listening to port :' + port);

taskController(app);
