const express = require('express');
const app = express();
const taskController = require('../controllers/taskController');

app.get('/read-Alltask', taskController.readAllTask );
app.get('/read-task/:_id', taskController.readTask );
app.post('/create-task', taskController.createTask );
app.post('/update-task', taskController.updateTask );
app.put('/task-base/:_id', taskController.updateWithId );

module.exports = app;