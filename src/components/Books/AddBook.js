import React, { useState } from "react";
import axios from "../../axiosConfig";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [serialNumber, setSerialNumber] = useState("");

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/books/add", { title, author, serialNumber });
      alert("Book added successfully!");
      window.location.href = "/books";
    } catch (err) {
      alert("Error adding book");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Book</h2>
      <form onSubmit={handleAddBook}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Serial Number:</label>
          <input
            type="text"
            className="form-control"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
