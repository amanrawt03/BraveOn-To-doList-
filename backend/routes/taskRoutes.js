import express from "express";
const router = express.Router();
import { createTask, deleteTask, completeTask } from "../controllers/taskController.js";

// Route to create a task
router.post("/tasks", createTask);

// Route to delete a task
router.delete("/tasks/:taskId", deleteTask);

// Route to complete a task and update sigma score
router.patch("/tasks/:taskId/complete", completeTask);

export default router;
  