import User from "../model/user.js";
import ExpressError from "../utils/expressError.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import crypto from "crypto";

// This function registers a new user, hashes the password, sets an httpOnly cookie, and returns 201
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  const existing = await User.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    throw new ExpressError("User already exists", 409);
  }

  const newUser = await User.create({
    username,
    email,
    password,
    role: "user",
  });
  const token = generateToken(newUser);

  if (!token) {
    throw new ExpressError("Token not found", 404);
  }

  const isProd = process.env.NODE_ENV === "production";
  res.cookie("userToken", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 48 * 60 * 60 * 1000, // 48h
  });

  const message = `Welcome to Zentro, ${newUser.username}! 🎉

We’re excited to have you join our community.

With your new account, you can now explore a wide range of products — from electronics to home essentials — all in one place.

Here’s what you can do next:
- Start shopping your favorite items
- Save your favorites to your wishlist
- Track your orders easily

If you ever need help, our support team is just an email away.

Welcome aboard, and happy shopping!
`;

  await sendEmail(newUser.email, "Welcome to Zentro! 🎉", message);

  return res.status(201).json({
    message: "Registered successfully",
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    },
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

  const token = generateToken(user);

  const isProd = process.env.NODE_ENV === "production";
  if (user.role === "admin") {
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 48 * 60 * 60 * 1000,
    });
  } else {
    res.cookie("userToken", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 48 * 60 * 60 * 1000,
    });
  }

  return res.status(200).json({
    message: "Welcome back to Zentro!",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
};

export const logout = async (req, res) => {
  const { type } = req.body;
  const isProd = process.env.NODE_ENV === "production";

  if (type === "admin") {
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    });
  } else {
    res.clearCookie("userToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    });
  }

  return res.status(200).json({ message: `${type || "user"} logged out` });
};

export const forgot = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ExpressError("User not found", 404);
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = resetPasswordToken;

  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  await user.save();

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const message = `Click this link to reset your password ${resetLink}. This link is expired after 15 minutes`;

  await sendEmail(user.email, "passwordReset", message);

  return res.status(200).json({ message: "Please check your Gmail" });
};

export const resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  if (!password) {
    throw new ExpressError("Password is required", 400);
  }

  const hashToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ExpressError("Invalid or expired token");
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  return res.status(200).json({ message: "Password updated successful" });
};

export const googleCallback = async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ message: "Missing Google credential" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ email });
    let message = "";

    if (!user) {
      // 🆕 Create new user
      user = await User.create({
        username: name,
        email,
        googleId,
        password: null,
        role: "user",
      });
      message =
        "Welcome to Zentro! Your account has been created via Google 🎉";
      const notification = `Welcome to Zentro, ${user.username}! 🎉

We’re excited to have you join our community.

With your new account, you can now explore a wide range of products — from electronics to home essentials — all in one place.

Here’s what you can do next:
- Start shopping your favorite items
- Save your favorites to your wishlist
- Track your orders easily

If you ever need help, our support team is just an email away.

Welcome aboard, and happy shopping!
`;

      await sendEmail(user.email, "Welcome to Zentro! 🎉", notification);
    } else {
      // 🔐 Existing user
      message = "Welcome back! Logged in with Google successfully.";
    }

    const token = generateToken(user);
    const isProd = process.env.NODE_ENV === "production";

    res.cookie("userToken", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 48 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Google login error:", err);
    return res.status(500).json({ message: "Google login failed" });
  }
};
