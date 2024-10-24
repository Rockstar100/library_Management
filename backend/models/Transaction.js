const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  issueDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  finePaid: { type: Boolean, default: false },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
