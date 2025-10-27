import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import {
  logout,
  signin,
  signup,
  googleCallback,
  resetPassword,
  forgot,
  facebookCallback
} from "../controller/user.js";
const router = express.Router();

// These routes wrap plain async controllers exactly once
router.post("/signup", wrapAsync(signup));
router.post("/signin", wrapAsync(signin));
router.post("/forgot", wrapAsync(forgot));
router.post("/logout", wrapAsync(logout));
router.put("/reset-password/:resetToken", wrapAsync(resetPassword));
router.post("/google/callback", wrapAsync(googleCallback));
router.post("/facebook/callback", facebookCallback);

export default router;
