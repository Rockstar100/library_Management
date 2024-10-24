import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar"; // Import NavBar component

function BookList() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get("/books/search");
      setBooks(res.data);
      setFilteredBooks(res.data); // Set filtered books to initially display all books
    };
    fetchBooks();
  }, []);

  // Function to handle search by title
  const handleSearch = (searchTerm) => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  return (
    <div>
      {/* <NavBar onSearch={handleSearch} />{" "} */}
      {/* Include NavBar and pass search handler */}
      <div className="container mt-5">
        <h2>Available Books</h2>
        <div className="mb-3">
          {/* Button to add a new book */}
          <Link to="/books/add" className="btn btn-success">
            Add New Book
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Serial Number</th>
              <th>Availability</th>
              <th>Actions</th> {/* Added a new column for actions */}
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.serialNumber}</td>
                <td>{book.availability ? "Available" : "Issued"}</td>
                <td>
                  {/* Link to update the book */}
                  <Link
                    to={`/books/update/${book._id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Update
                  </Link>
                  {/* Link to issue the book, only if available */}
                  {book.availability ? (
                    <Link
                      to={`/books/issue/${book._id}`}
                      state={{ bookId: book._id }}
                      className="btn btn-primary btn-sm"
                    >
                      Issue
                    </Link>
                  ) : (
                    <button className="btn btn-secondary btn-sm" disabled>
                      Issued
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookList;
