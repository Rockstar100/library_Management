import React, { useState } from "react";
import axios from "../../axiosConfig";

function ReturnBook() {
  const [bookId, setBookId] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleReturnBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/transactions/return", { bookId, returnDate });
      alert("Book returned successfully!");
    } catch (err) {
      alert("Error returning book");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Return Book</h2>
      <form onSubmit={handleReturnBook}>
        <div className="form-group">
          <label>Book ID:</label>
          <input
            type="text"
            className="form-control"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Return Date:</label>
          <input
            type="date"
            className="form-control"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Return Book
        </button>
      </form>
    </div>
  );
}

export default ReturnBook;
