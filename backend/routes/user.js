import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { logout, signin, signup } from "../controller/user.js";
const router = express.Router();

router.post("/signup", wrapAsync(signup));

router.post("/signin", wrapAsync(signin));

router.post("/logout", wrapAsync(logout));

export default router;
