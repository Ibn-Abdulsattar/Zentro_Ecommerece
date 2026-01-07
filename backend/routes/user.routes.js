import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { profile, updateProfile } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.get("/me", auth("user"), wrapAsync(profile));
router.put("/update", auth("user"), upload, wrapAsync(updateProfile));

export default router;