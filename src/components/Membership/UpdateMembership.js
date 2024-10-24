import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axiosConfig";

function UpdateMembership() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [duration, setDuration] = useState(6);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const response = await axios.get(`/memberships/${id}`);
        const { name, email, duration } = response.data;
        setName(name);
        setEmail(email);
        setDuration(duration);
      } catch (error) {
        console.error("There was an error fetching the membership!", error);
      }
    };

    fetchMembership();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/memberships/update/${id}`, { name, email, duration });
      navigate("/memberships"); // Navigate to the memberships page after updating
    } catch (error) {
      console.error("There was an error updating the membership!", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Membership</h2>
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
          Update Membership
        </button>
      </form>
    </div>
  );
}

export default UpdateMembership;
