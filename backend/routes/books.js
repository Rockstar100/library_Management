const express = require("express");
const Book = require("../models/Book");
const Transaction = require("../models/Transaction"); // Ensure you import the Transaction model
const router = express.Router();

// Add Book
router.post("/add", async (req, res) => {
  const { title, author, serialNumber } = req.body;

  // Validate input
  if (!title || !author || !serialNumber) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const book = new Book({ title, author, serialNumber });

  try {
    await book.save();
    res.status(201).json({ message: "Book added successfully." });
  } catch (error) {
    // Check for duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate serial number." });
    }
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

// Search Books
router.get("/search", async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

// Get Book by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found." });
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

// Update Book
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, serialNumber } = req.body;

  // Validate input
  if (!title || !author || !serialNumber) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, serialNumber },
      { new: true, runValidators: true }
    );

    if (!updatedBook)
      return res.status(404).json({ message: "Book not found." });

    res.json({ message: "Book updated successfully.", book: updatedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

// Issue Book
router.post("/issue", async (req, res) => {
  const { bookId, userId } = req.body;

  const book = await Book.findById(bookId);
  if (!book) return res.status(404).send("Book not found");
  if (!book.availability) return res.status(400).send("Book not available");

  book.availability = false;

  try {
    await book.save();

    const transaction = new Transaction({ book: bookId, user: userId });
    await transaction.save();

    res.send("Book issued successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

// Return Book
router.post("/return", async (req, res) => {
  const { bookId, transactionId, returnDate, finePaid } = req.body;

  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) return res.status(404).send("Transaction not found");

    transaction.returnDate = returnDate;
    transaction.finePaid = finePaid;
    await transaction.save();

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).send("Book not found");

    book.availability = true;
    await book.save();

    res.send("Book returned successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
