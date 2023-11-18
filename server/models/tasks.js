const mongoose = require('mongoose');

// Task Schema
const taskSchema = new mongoose.Schema({
    task_number: {
        type: String, required: true, unique: true,
        validate: {
            validator: (value) => {
                if (!value.startsWith('L')) {
                    throw new Error(' Task no: should be in format L##### ');
                }
            },
            message: 'Name must start with the letter L',
        },
    },
    estimate_hours: { type: Number, min: 0, max: 999.59 },
    estimate_notes: { type: String, default: '' },
    actual_hours: { type: Number, min: 0, max: 999.59 },
    notes: { type: String, default: '' },
    created_at: { type: Date, default: Date.now },

});

// Task Entry Schema
const taskEntrySchema = new mongoose.Schema({
    task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    new_estimate_hours: { type: Number, min: 0, max: 999.59 },
    new_estimated_notes: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

// Models
const Task = mongoose.model('Task', taskSchema);
const TaskEntry = mongoose.model('TaskEntry', taskEntrySchema);

module.exports = { Task, TaskEntry };
