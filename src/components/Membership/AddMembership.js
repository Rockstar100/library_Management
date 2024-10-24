import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";

function AddMembership() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [duration, setDuration] = useState(6);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/memberships/add", { name, email, duration });
      navigate("/memberships"); // Navigate to the memberships page after adding
    } catch (error) {
      console.error("There was an error adding the membership!", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Membership</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">
            Duration (months)
          </label>
          <select
            className="form-select"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Membership
        </button>
      </form>
    </div>
  );
}

export default AddMembership;
