var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoStarterKit = process.env.MONGO_DB_STARTER;

// Connect to the db
mongoose.connect(mongoStarterKit);

// Create a schema
var taskSchema = new mongoose.Schema({
    item: String,
    done: Boolean
});

// Create model type of task
var Task = mongoose.model('Task', taskSchema);
var urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(app) {

    app.get('/tasks', function(req, res) {
        // get data from mongodb and pass it to view
        Task.find({}, function(err, data){
            if(err) throw err;
            res.render('tasks', {tasks: data})
        });
    });

    app.post('/tasks', urlencodedParser, function(req, res) {
        // get data view and add to mongodb
        var newTask = Task(req.body).save(function(err, data) {
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/tasks/:item', function(req, res) {
        // delete requested item from mongodb
        Task.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
                if(err) throw err;
                res.json(data);
            })
    });

    app.put('/tasks/:_id/', function(req, res) {
        // update requested item from mongodb
        var id = req.params;

        Task.findOne({_id: req.params}, function(err, data) {
            if(err) {
                console.log(err);
                res.status(500).send()
            } else {
                data.done = !data.done;
                data.save();
                console.log("the db has been updated");
                res.send({redirect: '/tasks'});
            }
        })
    });
};
