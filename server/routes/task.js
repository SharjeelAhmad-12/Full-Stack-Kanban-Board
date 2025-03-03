const express = require("express");
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/taskController");

const router = express.Router();

router.get("/getTasks", getTasks);
router.post("/createTask", createTask);
router.put("/updateTask/:id", updateTask);
router.delete("/deleteTask/:id", deleteTask);

module.exports = router;
