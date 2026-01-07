import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5050;

async function startApp() {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
    console.log("CORS Origin:", process.env.FRONTEND_URL);
  } catch (err) {
    console.error("💥 Shutdown: DB connection failed", err);
    process.exit(1);
  }
}

startApp();
