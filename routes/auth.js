const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Create Admin (one-time)
router.post("/create-admin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.json({ msg: "Email & password required" });

    const exists = await User.findOne({ email });
    if (exists) return res.json({ msg: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashed });

    res.json({ msg: "Admin created successfully" });
  } catch (err) {
    res.json({ msg: "Error creating admin", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const u = await User.findOne({ email });
    if (!u) return res.json({ msg: "Invalid credentials" });

    const ok = await bcrypt.compare(password, u.password);
    if (!ok) return res.json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    res.json({ msg: "Login error", error: err.message });
  }
});

module.exports = router;
