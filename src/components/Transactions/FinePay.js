import React, { useState } from "react";
import axios from "../../axiosConfig";

function FinePay() {
  const [bookId, setBookId] = useState("");
  const [finePaid, setFinePaid] = useState(false);
  const [remarks, setRemarks] = useState("");

  const handleFinePay = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/fine/pay", { bookId, finePaid, remarks });
      alert("Fine paid successfully!");
    } catch (err) {
      alert("Error paying fine");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Pay Fine</h2>
      <form onSubmit={handleFinePay}>
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
          <label>Fine Paid:</label>
          <input
            type="checkbox"
            className="form-check-input"
            checked={finePaid}
            onChange={(e) => setFinePaid(e.target.checked)}
          />
        </div>
        <div className="form-group">
          <label>Remarks:</label>
          <textarea
            className="form-control"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Pay Fine
        </button>
      </form>
    </div>
  );
}

export default FinePay;
