import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  // Handle Logout function
  const handleLogout = () => {
    // Clear authentication tokens or session (if applicable)
    // Redirect to login or home page after logout
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/books">
          Library Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/books/return">
                Return Books
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/fine/pay">
                Fine Payment
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                All Users
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/memberships">
                All Members
              </Link>
            </li>
          </ul>
          <form className="d-flex me-3" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Books"
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
