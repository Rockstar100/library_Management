const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, role });
  await user.save();
  res.status(201).send("User Registered");
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid Email or Password");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).send("Invalid Email or Password");

  const token = jwt.sign({ id: user._id, role: user.role }, "secretkey");
  res.json({ token });
});

module.exports = router;
