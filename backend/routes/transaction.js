const express = require("express");
const Book = require("../models/Book");
const Transaction = require("../models/Transaction");
const router = express.Router();

// Issue Book
router.post("/issue", async (req, res) => {
  const { bookId, userId } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (!book.availability)
      return res.status(400).json({ message: "Book is not available" });

    book.availability = false;
    await book.save();

    const issueDate = new Date();
    const returnDate = new Date(issueDate);
    returnDate.setDate(issueDate.getDate() + 15); // Return date is 15 days ahead

    const transaction = new Transaction({
      book: bookId,
      user: userId,
      issueDate: issueDate,
      returnDate: returnDate,
    });

    await transaction.save();

    res.status(200).json({ message: "Book issued successfully", transaction });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Return Book
router.post("/return", async (req, res) => {
  const { transactionId, returnDate, finePaid } = req.body;

  try {
    const transaction = await Transaction.findById(transactionId).populate(
      "book"
    );
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });

    transaction.returnDate = new Date(returnDate);
    transaction.finePaid = finePaid;

    await transaction.save();

    const book = await Book.findById(transaction.book._id);
    book.availability = true;
    await book.save();

    res
      .status(200)
      .json({ message: "Book returned successfully", transaction });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Fine Payment
router.post("/pay-fine", async (req, res) => {
  const { transactionId, fineAmount } = req.body;

  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });

    if (fineAmount > 0) {
      transaction.finePaid = true;
    }

    await transaction.save();

    res.status(200).json({ message: "Fine paid successfully", transaction });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
