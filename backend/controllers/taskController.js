import TaskModel from "../models/taskModel.js";
import UserModel from "../models/userModel.js";

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { userId, text } = req.body;

    if (!userId || !text) {
      return res.status(400).json({ message: "User ID and text are required" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTask = new TaskModel({
      userId,
      text,
    });

    await newTask.save();
    user.tasks.push(newTask._id);
    await user.save();
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Find the task by ID
    const task = await TaskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Find the user associated with the task
    const user = await UserModel.findById(task.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Decrement the sigmaScore if the task is not completed
    if (!task.completed) {
      user.sigmaScore -= 2;
      await user.save();
    }

    // Remove the task reference from the user's tasks array
    user.tasks.pull(task._id);
    await user.save();

    // Delete the task
    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update task and sigma score when a task is completed
export const completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.completed) {
      return res.status(400).json({ message: "Task is already completed" });
    }

    // Mark the task as completed
    task.completed = true;
    await task.save();

    // Update user's sigma score
    const user = await UserModel.findById(task.userId);
    user.sigmaScore += 10;
    await user.save();

    res
      .status(200)
      .json({ message: "Task completed and sigma score updated", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
