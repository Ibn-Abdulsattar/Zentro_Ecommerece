import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { logout, signin, signup, author } from "../controller/user.js";
import auth from "../middleware/auth.js"; // <-- import middleware
const router = express.Router();

// These routes wrap plain async controllers exactly once
router.post("/signup", wrapAsync(signup));
router.post("/signin", wrapAsync(signin));
router.post("/logout", auth, wrapAsync(logout));
router.get("/me", auth, wrapAsync(author));

export default router;
