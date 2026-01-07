import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import crypto from "node:crypto";
import sendMail from "../services/sendMail.js";
import { Op } from "sequelize";
import Otp from "../models/Otp.js";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req, res) => {
  const { username, email, password, role="user" } = req.body;
  let user = await User.findOne({ where: { email } });

  if (user) {
    if (user.isVerified) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User already exists. Please sign in." });
    }
    user.username = username;
    user.password = password;
    await user.save();
  } else {
    user = await User.create({
      username,
      email,
      password,
      isVerified: false,
      avatar_url: "",
      phone_no: "",
      role,
    });
  }

  const otpRecord = await Otp.generateOTP(user.email);

  const subject = "Verify your Zentro account 🔐";

  const message = `
Hello ${user.username},

Thank you for joining Zentro! To complete your registration and verify your email address, please use the following One-Time Password (OTP):

Verification Code: ${otpRecord.code}

This code is valid for 5 minutes. For security reasons, please do not share this code with anyone.

If you did not request this code, you can safely ignore this email.

Welcome aboard,
The Zentro Team
`;

  await sendMail(user.email, subject, message);

  res.status(StatusCodes.OK).json({
    message:
      "Registration successful! Please enter the 6-digit code sent to your email to verify your account.",
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email: email },
    attributes: [
      "user_id",
      "username",
      "email",
      "password",
      "isVerified",
      "avatar_url",
      "phone_no",
      "role",
    ],
  });

  if (!user || !user.password) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Invalid email or password",
    });
  }

  if (!user.isVerified) {
    return res
      .status(StatusCodes.FORBIDDEN) // 403
      .json({ message: "Please verify your email before logging in." });
  }

  const match = await user.comparePassword(password);
  if (!match) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid email or password" });
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
      sameSite: isProd ? "none" : "lax", // Only set sameSite to 'none' if you are actually using HTTPS in dev. Otherwise, use 'lax' for both to keep things simple.
      maxAge: 3 * 60 * 60 * 1000, // 3 hours
    });
  }

  res.status(StatusCodes.OK).json({
    message: "Login successful",
    user,
    token,
  });
};

export const logout = async (req, res) => {
  const isProd = process.env.NODE_ENV === "production";

  res
    .clearCookie("userToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "lax" : "lax",
      path: "/",
    })
    .status(StatusCodes.OK)
    .json({ message: "Logout successful" });
};

export const forgot = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "User with this email does not exist" });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const expireDate = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordExpires = expireDate;
  await user.save();

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const subject = "Password Reset Request";
  const text = `Click the following link to reset your password: ${resetLink}`;

  await sendMail(user.email, subject, text);
  res.status(StatusCodes.OK).json({ message: "Password reset email sent" });
};

export const resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    where: {
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpires: { [Op.gt]: new Date() },
    },
  });

  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Token is invalid or has expired" });
  }
  user.password = password;
  user.resetPasswordToken = null;
  await user.save();
  res.status(StatusCodes.OK).json({ message: "Password reset successfully" });
};

export const verifyOtp = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email and code are required" });
  }

  const newUser = await User.findOne({ where: { email } });
  if (!newUser) {
    return res
      .status(StatusCodes.BAD_GATEWAY)
      .json({ message: "User don't exist" });
  }

  const otpRecord = await Otp.findOne({
    where: { email: email, expiresAt: { [Op.gt]: new Date() } },
    order: [["createdAt", "DESC"]],
  });

  if (!otpRecord || otpRecord.code !== code) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Invalid or expired code" });
  }

  await otpRecord.destroy();

  newUser.isVerified = true;
  await newUser.save();

  const token = generateToken(newUser);
  const isProd = process.env.NODE_ENV === "production";
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

  await sendMail(newUser.email, "Welcome to Zentro! 🎉", message);

  res
    .cookie("userToken", token, {
      httpOnly: true,
      secure: isProd,
      maxAge: 3 * 60 * 60 * 1000, // 3 hours
      sameSite: isProd ? "none" : "lax",
    })
    .status(StatusCodes.OK)
    .json({ message: "User registered successfully", user: newUser, token });
};

export const google = async (req, res) => {
  const { credential } = req.body;
  if (!credential) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Missing Google Credentials!" });
  }

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const { name, email, sub, email_verified, picture } = payload;

  const [user, created] = await User.findOrCreate({
    where: { email: email },
    defaults: {
      email,
      username: name,
      isVerified: email_verified,
      googleId: sub,
      avatar_url: picture,
      phone_no: "",
      role: "user"
    },
    attributes: { exclude: "password" },
  });

  if (!created || !user.googleId) {
    user.googleId = sub;
    await user.save();
  }

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

  const token = generateToken(user);
  const isProd = process.env.NODE_ENV === "production";

  if (user.role === "admin") {
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 3 * 60 * 60 * 1000,
    });
  } else {
    res.cookie("userToken", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 3 * 60 * 60 * 1000,
    });
  }

  if (created) {
    await sendMail(user.email, "Welcome to Zentro! 🎉", notification);

    return res.status(StatusCodes.CREATED).json({
      message: "Account created successfully via Google!",
      user,
      token,
    });
  }

  res

    .status(StatusCodes.OK)
    .json({
      message: "Welcome back! You have successfully logged in.",
      user,
      token,
    });
};

export const facebook = async (req, res) => {};
