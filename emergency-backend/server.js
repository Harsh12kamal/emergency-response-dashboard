import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import incidentRoutes from "./routes/incidentRoutes.js";
import dispatchRoutes from "./routes/dispatchRoutes.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/incidents", incidentRoutes);
app.use("/api/dispatch", dispatchRoutes);

app.get("/", (req, res) => {
  res.send("Emergency Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
