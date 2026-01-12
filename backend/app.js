import express from "express";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import addressRoutes from "./routes/address.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import cors from "cors";
import wrapAsync from "./utils/wrapAsync.js";
import { stripeWebhook } from "./controllers/payment.controller.js";

dotenv.config();
const app = express();

app.post('/webhook', express.raw({ type: 'application/json' }), wrapAsync(stripeWebhook));

app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }));

// 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true // Ensures all generated URLs use HTTPS
});

// Routes
app.use("/user", authRoutes);
app.use("/profile", userRoutes);
app.use('/address', addressRoutes);
app.use('/payment', paymentRoutes)


app.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Welcome to the Author Backend API",
    status: StatusCodes.OK,
  });
});



app.use((err, req, res, next) => { 
  console.error("🔥 Error:", err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message });
});

export default app;
