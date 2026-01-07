import express from "express";
import {
  register,
  login,
  forgot,
  resetPassword,
  logout,
  verifyOtp,
  google,
  facebook,
} from "../controllers/auth.controller.js";
import wrapAsync from "../utils/wrapAsync.js";
import { loginSchema, otpSchema, registerSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/signup", registerSchema, wrapAsync(register));
router.post("/signin", loginSchema, wrapAsync(login));
router.post("/forgot", wrapAsync(forgot));
router.post("/logout", wrapAsync(logout));
router.put("/reset-password/:resetToken", wrapAsync(resetPassword));
router.post("/verify-otp", otpSchema, wrapAsync(verifyOtp));
router.post("/google", wrapAsync(google));
router.post("/facebook", wrapAsync(facebook));

export default router;
