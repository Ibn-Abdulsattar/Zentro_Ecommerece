import express from "express";
const app = express();
const port = process.env.PORT || 8080;
import mongoose from "mongoose";
import user from "./routes/user.js";
import dotenv from "dotenv";


dotenv.config();
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
