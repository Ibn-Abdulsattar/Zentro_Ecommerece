// utils/generateToken.js
import jwt from "jsonwebtoken";

// This function creates a signed JWT for a user id and validates that envs exist
const generateToken = (userId) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRE = process.env.JWT_EXPIRE || "2d";

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }

  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

export default generateToken;
