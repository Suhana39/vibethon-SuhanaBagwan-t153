const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const contentRoutes = require("./routes/contentRoutes");
const progressRoutes = require("./routes/progressRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "MindML backend is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/progress", progressRoutes);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "";

const startServer = async () => {
  try {
    if (MONGODB_URI) {
      await mongoose.connect(MONGODB_URI);
      console.log("Connected to MongoDB");
    } else {
      console.log("MONGODB_URI missing, running without database connection");
    }
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
