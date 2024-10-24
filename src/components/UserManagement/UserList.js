import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);

  // Fetch users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("/users/all");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/users/delete/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("There was an error deleting the user!", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>User Management</h2>
      <div className="mb-3">
        {/* Link to add a new user */}
        <Link to="/user/add" className="btn btn-success">
          Add New User
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {/* Link to update the user */}
                <Link
                  to={`/user/update/${user._id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Update
                </Link>
                {/* Button to delete the user */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(user._id)}
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

export default UserList;
