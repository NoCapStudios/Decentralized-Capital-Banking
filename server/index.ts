// server/index.ts

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { saveApplication, getApplication, getBugReportUser } from "./mongodb.ts";
import { supabaseAdmin } from "./supabase.ts";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ success: false, error: "Email and password are required" });
  }

  try {
    const { data, error } = await supabaseAdmin.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.SUPABASE_EMAIL_REDIRECT_TO || "http://localhost:5173/auth?verified=1",
      },
    });

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    return res.status(201).json({
      success: true,
      userId: data.user?.id,
      message: "Check your email to confirm your account.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  console.log("Body:", req.body);
  console.log("Has email:", !!req.body?.email);
  console.log("Has password:", !!req.body?.password);

  const { email, password } = req.body ?? {};

  if (!email || !password) {
    console.log("❌ Missing credentials");
    return res.status(400).json({ success: false, error: "Email and password are required" });
  }

  try {
    console.log("Attempting Supabase login for:", email);
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({ email, password });

    if (error) {
      console.error("❌ Supabase error:", error);
      return res.status(400).json({ success: false, error: error.message });
    }

    console.log("✅ Login successful:", data.user?.id);
    return res.json({
      success: true,
      userId: data.user?.id,
      accessToken: data.session?.access_token,
      refreshToken: data.session?.refresh_token,
      message: "Logged in successfully.",
    });
  } catch (err) {
    console.error("❌ Exception:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

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