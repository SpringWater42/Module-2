import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";
import User from "../model/user.js";

// POST /api/signup with debug prints
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  console.log("📥 Signup request received");
  console.log("➡️ Email:", email);
  // console.log("➡️ Password:", password); // Optional: avoid logging passwords in production

  if (!email || !password) {
    console.log("❌ Missing email or password");
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    console.log("🔍 Existing user query result:", existingUser);

    if (existingUser.length > 0) {
      console.log("⚠️ User already exists");
      return res.status(409).json({ message: "User already exists" });
    }

    const userId = await User.create({ email, password });
    console.log("✅ New user created with ID:", userId);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("🔥 Signup error:", err.message);
    console.error("🧵 Stack trace:", err.stack);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log("Incorrect password");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

export default router;
