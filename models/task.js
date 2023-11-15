const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const taskSchema = new Schema({
    name: String,
    description: String,
    dueDate: Date,
    type: String,
    priority: String,
    completed: Boolean,
    subTasks: Array,
});

const Task = model('Tasks', taskSchema);
module.exports = Task;
