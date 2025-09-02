import express from "express";
const app = express();
const port = process.env.PORT || 8080;
import mongoose from "mongoose";
import user from "./routes/user.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


async function main() {
  await mongoose
    .connect(process.env.MONGODB)
    .then((res) => console.log("Connection successful"))
    .catch((err) => console.log(err));
}
main();

app.use("/user", user);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});

// server.js (after all routes)
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err); // log full error in console

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({ error: message });
});

