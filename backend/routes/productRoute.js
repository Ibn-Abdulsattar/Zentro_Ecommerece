import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import {
  createProduct,
  getAllProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct
} from "../controller/productController.js";

const router = express.Router();

router.post("/products", wrapAsync(createProduct));       // Create product
router.get("/products", wrapAsync(getAllProducts));       // List all
router.get("/products/:slug", wrapAsync(getProductBySlug)); // Get single
router.put("/products/:id", wrapAsync(updateProduct));    // Update
router.delete("/products/:id", wrapAsync(deleteProduct)); // Delete

export default router;
