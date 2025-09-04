import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const port = process.env.PORT || 8080;
import mongoose from "mongoose";
import user from "./routes/user.js";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// This enables correct behavior for 'secure' cookies behind proxies like Render/Heroku/Nginx
// This function configures Express to trust proxy headers like X-Forwarded-Proto.
app.set("trust proxy", 1); // <-- important in production when using sameSite:'none' + secure cookies
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function main() {
  await mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("Connection successful"))
    .catch((err) => console.log(err));
}
main();

app.use("/user", user);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// This must be after routes, before listen (order matters relative to routes)
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
