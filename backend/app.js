import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const port = process.env.PORT || 8080;
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import User from "./model/user.js";
import auth from "./middleware/auth.js";

app.set("trust proxy", 1); // <-- important in production when using sameSite:'none' + secure cookies
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function main() {
  await mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("Connection successful"))
    .catch((err) => console.log(err));
}
main();

import user from "./routes/user.js";
import product from "./routes/productRoute.js";
import category from "./routes/categoryRoute.js";
import order from "./routes/orderRoute.js";
import variant from "./routes/variantRoute.js";
import media from "./routes/mediaRoute.js";


app.use("/user", user);
app.use('/api', product);
app.use('/api', category);
app.use('/api', variant);
app.use('/api', order);
app.use('/api', media);


app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/me", auth("user"), async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "username email role status createdAt updatedAt"
  );
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.status(200).json({
    message: "Welcome back!",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

app.get("/admin", auth("admin"), async (req, res) => {
  const admin = await User.findById(req.user._id);
  console.log(admin);
  res.send(admin);
});

app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);
  const statusCode = err.statusCode || err.status || 500; // support both
  const message = err.message || "Internal Server Error";
  // Optional: map Mongo duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({ error: "Email or username already in use" });
  }
  res.status(statusCode).json({ error: message });
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
