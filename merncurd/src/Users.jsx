import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001');
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (!confirmDelete) return;
      
      await axios.delete(`http://localhost:3001/deleteUser/${id}`);
      // Refresh the user list after deletion
      fetchUsers();
      alert("User deleted successfully");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container-fluid vh-100 bg-light d-flex justify-content-center align-items-center p-4">
      <div className="w-100 bg-white rounded shadow p-4" style={{ maxWidth: '1000px' }}>
        <h2 className="mb-4 text-primary">User Management</h2>
        
        {users.length === 0 ? (
          <div className="alert alert-info">No users found. Add a new user to get started.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="align-middle">{user.name}</td>
                    <td className="align-middle">{user.email}</td>
                    <td className="align-middle">{user.age}</td>
                    <td>
                      <Link 
                        to={`/update/${user._id}`} 
                        className="btn btn-sm btn-primary me-2"
                      >
                        Update
                      </Link>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="d-flex justify-content-end mt-3">
          <Link to='/create' className="btn btn-primary">
            Add New User
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Users;