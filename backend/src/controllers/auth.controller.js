import { createUser, getUserByEmail, isValidPassword, generateAuthToken } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js"
import bcrypt from "bcrypt"; // ✅ Use bcryptjs instead of bcrypt

// 🔹 Register User
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body; // ✅ Receive `password` from frontend

    // 🛑 Check if user exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) throw new ApiError(400, "User already exists");

    // 🔐 Hash the password before storing
    const PasswordHash = await bcrypt.hash(password, 10);

    // 🛠️ Create new user
    await createUser(name, email, PasswordHash);

    res.status(201).json(new ApiResponse(201, null, "User registered successfully!"));
});
// 🔹 Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 🔍 Get user from database
    const user = await getUserByEmail(email);
    if (!user) throw new ApiError(401, "Invalid credentials");

    // 🔑 Compare plaintext password with hashed PasswordHash
    if (!(await bcrypt.compare(password, user.PasswordHash))) {
        throw new ApiError(401, "Invalid credentials");
    }

    // 🎟️ Generate JWT Token
    const token = generateAuthToken(user.UserID, user.Email);

    res.status(200).json(new ApiResponse(200, { token }, "Login successful!"));
});


export{
    registerUser,
    loginUser
}

