const express = require("express");
const Membership = require("../models/Membership");
const router = express.Router();

// Add Membership
router.post("/add", async (req, res) => {
  const { name, email, duration } = req.body;

  if (!name || !email || !duration) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const membership = new Membership({ name, email, duration });
    await membership.save();
    res.status(201).json({ message: "Membership added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Get all memberships
router.get("/all", async (req, res) => {
  try {
    const memberships = await Membership.find({});
    res.json(memberships);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Find membership by ID
router.get("/:id", async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (!membership) {
      return res.status(404).json({ message: "Membership not found." });
    }
    res.json(membership);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Update Membership by ID
router.put("/update/:id", async (req, res) => {
  const { name, email, duration } = req.body;

  try {
    const membership = await Membership.findById(req.params.id);
    if (!membership) {
      return res.status(404).json({ message: "Membership not found." });
    }

    membership.name = name || membership.name;
    membership.email = email || membership.email;
    membership.duration = duration || membership.duration;

    await membership.save();
    res.json({ message: "Membership updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Delete Membership by ID
// Delete Membership by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (!membership) return res.status(404).json({ message: "Membership not found." });

    // Use findByIdAndDelete instead of remove
    await Membership.findByIdAndDelete(req.params.id);
    res.json({ message: "Membership deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});


module.exports = router;
