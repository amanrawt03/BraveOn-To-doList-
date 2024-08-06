import dotenv from "dotenv";
import path from 'path'
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000; 
const __dirname = path.resolve();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
