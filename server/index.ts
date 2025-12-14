// server/index.ts

import express from "express";
import cors from "cors";
import { saveApplication, getApplication } from "./mongodb.ts";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/applications", async (req, res) => {
  try {
    const result = await saveApplication(req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.get("/api/applications/:email", async (req, res) => {
  try {
    const application = await getApplication(req.params.email); // Renamed from 'app' to 'application'
    if (!application) {
      return res.status(404).json({ success: false, error: "Not found" });
    }
    res.json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

app.listen(3001, () => {
  console.log("API running on http://localhost:3001");
});