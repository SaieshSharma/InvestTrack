import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import db from "../config/db.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "")?.trim();

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // Verify JWT Token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Fetch user from MySQL
    db.query("SELECT id, name, email FROM users WHERE id = ?", [decodedToken.id], (err, results) => {
      if (err || results.length === 0) {
        throw new ApiError(401, "Invalid Access Token");
      }

      req.user = results[0]; // Attach user to request
      next();
    });

  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export default verifyJWT;
