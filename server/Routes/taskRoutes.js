const express = require('express');
const router = express.Router();
const TasksModel = require('../models/Task');

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await TasksModel.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error:error.message });
    }
});

router.post('/create', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new TasksModel({ title, description });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error: error.message });
    }
});

router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await TasksModel.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error fetching task", error: error.message });
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        const { title, description } = req.body;
        const updatedTask = await TasksModel.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );
        if (!updatedTask) return res.status(404).json({ message: "Task not found" });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedTask = await TasksModel.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: "Task not found" });
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error: error.message });
    }
});

module.exports = router;