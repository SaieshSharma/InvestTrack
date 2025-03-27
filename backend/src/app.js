import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import {userRoutes} from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js"
import errorHandler from "./middlewares/errorHandler.middleware.js"; // Centralized error handler

dotenv.config();


console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Error Handling Middleware (Global)
app.use(errorHandler);

export default app;
