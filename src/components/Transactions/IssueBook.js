import React, { useState } from "react";
import axios from "../../axiosConfig";
import { useParams } from "react-router-dom";
function IssueBook() {
    const { id } = useParams();
  const [bookId, setBookId] = useState(id);
  const [userId, setUserId] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleIssueBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/transaction/issue", {
        bookId,
        userId,
        issueDate,
        returnDate,
      });
      alert("Book issued successfully!");
    } catch (err) {
      alert("Error issuing book");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Issue Book</h2>
      <form onSubmit={handleIssueBook}>
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
          <label>User ID:</label>
          <input
            type="text"
            className="form-control"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Issue Date:</label>
          <input
            type="date"
            className="form-control"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
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
          Issue Book
        </button>
      </form>
    </div>
  );
}

export default IssueBook;
