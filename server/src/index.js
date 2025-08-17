import "dotenv/config";
import express from "express";
import cors from "cors";
// import { connectDB } from "./db.js";
import routes from "./routes/index.js";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.get("/health", (_, res) => res.json({ ok: true }));
app.use("/api", routes);

const PORT = process.env.PORT || 8080;
// Start the server
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});




const connectToMongoDB = async () => {
  try {
      console.log("🔍 Loaded MONGO_URI:", process.env.MONGO_URI);
      await mongoose.connect(process.env.MONGO_URI, {
  dbName: "meeting",
    serverSelectionTimeoutMS: 20000,
  directConnection: false,
  ssl: true,
  tlsAllowInvalidCertificates: false,
});

      console.log("Connected to MongoDB");
  } catch (error) {
      console.log("Error connecting to MongoDB", error.message);
  }
};

