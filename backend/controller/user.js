import User from "../model/user.js";
import ExpressError from "../utils/expressError.js";
import generateToken from "../utils/generateToken.js";

// This function registers a new user, hashes the password, sets an httpOnly cookie, and returns 201
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  const existing = await User.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    throw new ExpressError("User already exists", 409);
  }

  const newUser = await User.create({ username, email, password });
  const token = generateToken(newUser._id);

  const isProd = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 48 * 60 * 60 * 1000, // 48h
  });

  return res.status(201).json({
    message: "Registered successfully",
    user: { id: newUser._id, username: newUser.username, email: newUser.email },
  });
};

// This function logs a user in, sets the same cookie, and avoids user-enumeration messages
export const signin = async (req, res) => {
  const { email, password } = req.body;

  // note: select('+password') because the schema hides it by default
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select(
    "+password"
  );
  if (!user) {
    // Generic message to avoid leaking whether an email exists
    throw new ExpressError("Invalid email or password", 400);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ExpressError("Invalid email or password", 400);
  }

  const token = generateToken(user._id);

  const isProd = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 48 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "Welcome back!",
    user: { id: user._id, username: user.username, email: user.email },
  });
};

// This function clears the auth cookie using the same attributes used when setting it
export const logout = async (req, res) => {
  const isProd = process.env.NODE_ENV === "production";
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });
  return res.status(200).json({ message: "You are logged out" });
};

export const author = async (req, res) => {
  res.status(200).json({});
};
