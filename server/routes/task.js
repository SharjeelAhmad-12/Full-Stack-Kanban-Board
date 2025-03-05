const express = require("express");
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/taskController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/getTasks",authMiddleware, getTasks);
router.post("/createTask",authMiddleware, createTask);
router.put("/updateTask/:id",authMiddleware, updateTask);
router.delete("/deleteTask/:id",authMiddleware, deleteTask);

module.exports = router;
