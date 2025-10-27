import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import {
  createVariant,
  getVariantsByProduct,
  updateVariant,
  deleteVariant
} from "../controller/variantController.js";

const router = express.Router();

// CRUD endpoints
router.post("/variants", wrapAsync(createVariant));              // Create variant
router.get("/variants/:productId", wrapAsync(getVariantsByProduct)); // Get all variants for a product
router.put("/variants/:productId", wrapAsync(updateVariant));    // Update variant by ID
router.delete("/variants/:productId", wrapAsync(deleteVariant)); // Delete variant by ID

export default router;
