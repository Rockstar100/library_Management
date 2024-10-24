import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { useParams } from "react-router-dom";

function UpdateBook() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [serialNumber, setSerialNumber] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      const res = await axios.get(`/books/${id}`);
      setTitle(res.data.title);
      setAuthor(res.data.author);
      setSerialNumber(res.data.serialNumber);
    };
    fetchBook();
  }, [id]);

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/books/update/${id}`, {
        title,
        author,
        serialNumber,
      });
      alert("Book updated successfully!");
      window.location.href = "/books";
    } catch (err) {
      alert("Error updating book");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Book</h2>
      <form onSubmit={handleUpdateBook}>
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
          Update Book
        </button>
      </form>
    </div>
  );
}

export default UpdateBook;
