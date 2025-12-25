// server/index.ts

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { saveApplication, getApplication, getBugReportUser } from "./mongodb.ts";

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
    const application = await getApplication(req.params.email);
    if (!application) {
      return res.status(404).json({ success: false, error: "Not found" });
    }
    res.json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

app.get("/api/bug/:email", async (req, res) => {
  try {
    const user = await getBugReportUser(req.params.email);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});



app.listen(3001, () => {
  console.log("API running on http://localhost:3001");
});