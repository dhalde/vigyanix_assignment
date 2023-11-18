const { Task, TaskEntry } = require('../models/tasks');

const validateTimeEstimate = (estimate) => {
    const decimalPart = estimate % 1;
    return estimate >= 0 && decimalPart >= 0 && decimalPart <= 0.59;
};


const readAllTask = async (req, res) => {
    try {
        const allTask = await Task.find({});
        res.status(201).json(allTask);

    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const readTask = async (req, res) => {
    try {

        const allTask = await Task.findById(req.params._id);
        if (!allTask) {
            return res.status(401).error(`task doesnt exist with ${req.params._id}`);
        }
        const AlltaskEntry = await TaskEntry.find({ task_id: req.params._id }).populate('task_id');
        if (!AlltaskEntry) {
            return res.status(200).json(allTask);
        }
        console.log(AlltaskEntry);
        res.status(201).json(AlltaskEntry);

    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const createTask = async (req, res) => {

    try {
        const { task_number, estimate_hours, estimate_notes, actual_hours, notes } = req.body;

        const existingTask = await Task.findOne({ task_number });
        if (existingTask) {
            return res.status(400).json({ error: 'Task number already exists' });
        }


        const isValidTimeEstimate = validateTimeEstimate(estimate_hours);
        const isValidTimeHrs = validateTimeEstimate(actual_hours);
        if (!isValidTimeEstimate || !isValidTimeHrs) {
            return res.status(400).json({ error: 'Invalid time estimate' });
        }

        const newTaskData = { task_number, estimate_hours, estimate_notes, actual_hours, notes };


        const newTask = new Task(newTaskData);
        const savedTask = await newTask.save();

        const newTaskEntryData = {
            task_id: savedTask._id,
            new_estimate_hours: estimate_hours,
            new_estimated_notes: estimate_notes,
        };
        const newTaskEntry = new TaskEntry(newTaskEntryData);
        await newTaskEntry.save();
        res.status(201).json(savedTask);

    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateTask = async (req, res) => {
    try {
        const { task_id, new_estimate_hours, new_estimated_notes } = req.body;

        if (!task_id || !new_estimate_hours || !new_estimated_notes) {
            return res.status(400).json({ error: 'PLease fill all inputs' });
        }

        const isValidTimeEstimate = validateTimeEstimate(new_estimate_hours);
        if (!isValidTimeEstimate) {
            return res.status(400).json({ error: 'Invalid time estimate' });
        }

        const newTaskData = { task_id, new_estimate_hours, new_estimated_notes };
        const newTask = new TaskEntry(newTaskData);

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);

    } catch (error) {
        console.error('Error while updating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateWithId = async (req, res) => {
    try {
        const { actual_hours, notes } = req.body;


        const existingTask = await Task.findById(req.params._id);

        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const isValidTimeEstimate = validateTimeEstimate(actual_hours);
        if (!isValidTimeEstimate) {
            return res.status(400).json({ error: 'Invalid time estimate' });
        }

        if (actual_hours !== undefined) {
            existingTask.actual_hours = actual_hours;
        }
        if (notes !== undefined) {
            existingTask.notes = notes;
        }

        const updatedTask = await existingTask.save();

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

module.exports = { createTask, updateTask, readAllTask, readTask, updateWithId };