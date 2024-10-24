const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's name
  email: { type: String, required: true }, // User's email
  startDate: { type: Date, default: Date.now }, // Membership start date
  duration: { type: Number, default: 6 }, // Membership duration in months (6, 12, 24)
});

const Membership = mongoose.model("Membership", membershipSchema);
module.exports = Membership;
