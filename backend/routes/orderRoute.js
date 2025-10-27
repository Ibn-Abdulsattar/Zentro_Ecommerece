import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controller/orderController.js";

const router = express.Router();

router.post("/orders", wrapAsync(createOrder)); // Create order
router.get("/orders", wrapAsync(getAllOrders)); // Admin: get all
router.get("/orders/:id", wrapAsync(getOrderById)); // Get single order
router.put("/orders/:id", wrapAsync(updateOrderStatus)); // Update order status
router.delete("/orders/:id", wrapAsync(deleteOrder)); // Delete order

export default router;
