import { Sequelize } from "sequelize";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/expressError.js";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: false,
    //  {
    //   require: true,
    //   rejectUnauthorized: false, // Required for many online providers like Supabase/Neon
    // },
  },
  logging: false, // control: Chattiness: disable logging
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate(); // If this fails, it jumps to catch automatically
    console.log("✅ Database connected successfully.");

    await sequelize.sync({ alter: true });
    console.log("✅ Database synced.");
  } catch (error) {
    console.error("❌ Connection Error Detail:", error.message);
    throw new ExpressError(
      "Unable to connect to the database: " + error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const disconnectDB = wrapAsync(async () => {
  const disconnect = await sequelize.close();
  if (!disconnect) {
    throw new ExpressError(
      "Unable to close the database connection",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  console.log("Database connection closed.");
});

process.on("SIGINT", async () => {
  await disconnectDB();
  console.log("Process Signal Interrupt terminated");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await disconnectDB();
  console.log("Process Signal Terminate terminated");
  process.exit(0);
});
