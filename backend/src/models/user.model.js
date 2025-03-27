import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// 🔹 Create User with Hashed Password
export const createUser = async (name, email, password) => {
    return new Promise(async (resolve, reject) => {
        const passwordHash = await bcrypt.hash(password, 10);
        const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(query, [name, email, passwordHash], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// 🔍 Get User by Email
export const getUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE email = ?";
        db.query(query, [email], (err, results) => {
            if (err) reject(err);
            resolve(results[0]); // Return first user
        });
    });
};

// 🔑 Validate Password
export const isValidPassword = async (enteredPassword, storedPassword) => {
    return await bcrypt.compare(enteredPassword, storedPassword);
};

// 🎟️ Generate JWT Token
export const generateAuthToken = (userId, email) => {
    return jwt.sign({ id: userId, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
};
