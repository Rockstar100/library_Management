const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  availability: { type: Boolean, default: true },
  issueDate: { type: Date },
  returnDate: { type: Date },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
