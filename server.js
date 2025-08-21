const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB (local or Atlas)
mongoose.connect("connectionstring", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Task Schema
const TaskSchema = new mongoose.Schema({
    title: String,
    completed: { type: Boolean, default: false }
});
const Task = mongoose.model("Task", TaskSchema);

// Routes
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post("/tasks", async (req, res) => {
    const newTask = new Task({ title: req.body.title });
    await newTask.save();
    res.json(newTask);
});

app.put("/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, { completed: req.body.completed }, { new: true });
    res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

// Start server
app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
