import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { Link } from "react-router-dom";

function MembershipList() {
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const res = await axios.get("/memberships/all");
        setMemberships(res.data);
      } catch (error) {
        console.error("Error fetching memberships:", error);
      }
    };
    fetchMemberships();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/memberships/delete/${id}`);
      setMemberships(memberships.filter((membership) => membership._id !== id));
    } catch (error) {
      console.error("Error deleting membership:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Memberships</h2>
      <div className="mb-3">
        <Link to="/memberships/add" className="btn btn-success">
          Add New Membership
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Duration (months)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {memberships.map((membership) => (
            <tr key={membership._id}>
              <td>{membership.name}</td>
              <td>{membership.email}</td>
              <td>{membership.duration}</td>
              <td>
                <Link
                  to={`/memberships/update/${membership._id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(membership._id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MembershipList;
