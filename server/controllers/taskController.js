const TaskModel = require("../models/TaskSchema");

const getTasks = async (req, res, next) => {
  try {
    const tasks = await TaskModel.find();
    res.json({ success: true, tasks });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { todo, description, taskType } = req.body;

    if (!todo || !description || !taskType) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const validTaskTypes = ["Critical-Task", "Normal-Task", "Urgent-Task"];
    if (!validTaskTypes.includes(taskType)) {
      return res.status(400).json({ success: false, message: "Invalid task type" });
    }

    const newTask = new TaskModel({ todo, description, taskType });
    await newTask.save();

    res.status(201).json({ success: true, message: "Task Created Successfully", task: newTask });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { todo, description, taskType, orderIndex } = req.body;

    if (!todo && !description && !taskType && orderIndex === undefined) {
      return res.status(400).json({ success: false, message: "Provide at least one field to update" });
    }

    if (taskType) {
      const validTaskTypes = ["Critical-Task", "Normal-Task", "Urgent-Task"];
      if (!validTaskTypes.includes(taskType)) {
        return res.status(400).json({ success: false, message: "Invalid task type" });
      }
    }

    const existingTask = await TaskModel.findById(req.params.id);
    if (!existingTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    if (taskType && taskType !== existingTask.taskType) {
      const highestOrderTask = await TaskModel.findOne({ taskType }).sort("-orderIndex");
      req.body.orderIndex = highestOrderTask ? highestOrderTask.orderIndex + 1 : 0;
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, message: "Task Updated Successfully", task: updatedTask });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, message: "Task Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
