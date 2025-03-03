const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    todo: { type: String, 
    required: true, 
    trim: true 
  },
    description: { type: String,
    required: true,
    trim: true 
  },
    taskType: {
      type: String,
      enum: ["Critical-Task", "Normal-Task", "Urgent-Task"],
      required: true,
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Task", TaskSchema);
