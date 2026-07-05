import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import apiRoutes from "./routes/apiRoutes.js";

configDotenv();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Successfully connected to MongoDB Vault!"))
  .catch((err) => console.error("❌ Database connection error:", err));

app.use("/api", apiRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "✅GhostRoute server is successfully running..." });
});

app.listen(port, () => {
  console.log(`🚀 Server is listening on port : ${port}`);
});
