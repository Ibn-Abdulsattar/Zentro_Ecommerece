import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controller/categoryController.js";

const router = express.Router();

// Create a new category
router.post("/category", wrapAsync(createCategory));

// Get all categories
router.get("/category", wrapAsync(getAllCategories));

// Get single category
router.get("/category/:id", wrapAsync(getCategoryById));

// Update a category
router.put("/category/:id", wrapAsync(updateCategory));

// Delete a category
router.delete("/category/:id", wrapAsync(deleteCategory));

export default router;
