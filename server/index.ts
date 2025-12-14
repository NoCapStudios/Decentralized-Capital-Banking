// server/index.ts
import express from "express";
import cors from "cors";
import { saveApplication, getApplication } from "./mongodb.ts";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/applications", async (req, res) => {
  try {
    const id = await saveApplication(req.body);
    res.json({ success: true, id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.get("/api/applications/:email", async (req, res) => {
  try {
    const app = await getApplication(req.params.email);
    res.json(app);
  } catch (err) {
    console.error(err);
    res.status(500).json(null);
  }
});

app.listen(3001, () => {
  console.log("API running on http://localhost:3001");
});
