import express from "express";
import multer from "multer";
import wrapAsync from "../utils/wrapAsync.js";
import { uploadMedia, deleteMedia } from "../controller/mediaController.js";

const router = express.Router();

// Multer configuration
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), wrapAsync(uploadMedia));
router.delete("/upload/:id", wrapAsync(deleteMedia));

export default router;
