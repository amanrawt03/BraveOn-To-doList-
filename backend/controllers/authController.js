import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../lib/generateToken.js";
export const signup = async (req, res) => {
  try {
    const { username, password, gender } = req.body;

    // Validate the input
    if (!username || !password || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      gender,
      sigmaScore: 0, // Initialize sigmaScore as needed
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      // Save the user to the database
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        gender: newUser.gender,
        sigmaScore: newUser.sigmaScore,
        tasks: newUser.tasks,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Please enter all fields" });
    }
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      gender: user.gender,
      sigmaScore: user.sigmaScore,
      tasks: user.tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server error", error });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "tasks",
        select: "-password"
      })
    // .populate({
    //   path: "user",
    //   select: "-password",
    // })
    // .populate({
    //   path: "comments.user",
    //   select: "-password",
    // });
    //user me uska password chodhke baki sari details bhejdia
    return res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server error", error });
  }
};
