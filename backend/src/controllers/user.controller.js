// import db from "../config/db.js";
// import User from "../models/userModel.js";
// import asyncHandler from "../utils/asyncHandler.js";
// import ApiError from "../utils/ApiError.js";
// import ApiResponse from "../utils/ApiResponse.js";

// // 🔹 Register User
// export const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;

//   // 🛑 Check if user already exists
//   const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
//   if (existingUser.length) throw new ApiError(400, "User already exists");

//   // 🛠️ Create new user object
//   const user = new User(null, name, email, password);
//   await user.hashPassword();

//   // 📥 Insert into DB
//   await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
//     user.name, user.email, user.password
//   ]);

//   res.status(201).json(new ApiResponse(201, null, "User registered successfully!"));
// });

// // 🔹 Login User
// export const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   // 🔍 Find user
//   const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
//   if (rows.length === 0) throw new ApiError(401, "Invalid credentials");

//   const user = new User(rows[0].id, rows[0].name, rows[0].email, rows[0].password);

//   // 🔑 Verify password
//   if (!(await user.isValidPassword(password))) throw new ApiError(401, "Invalid credentials");

//   // 🎟️ Generate JWT Token
//   const token = user.generateAuthToken();

//   res.status(200).json(new ApiResponse(200, { token }, "Login successful!"));
// });
