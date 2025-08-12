import { useState } from "react";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([
    { Name: "Muntaha", Email: "Muntahamirza@gmail.com", Age: 22 },
    { Name: "John", Email: "john@example.com", Age: 30 },
    { Name: "Sarah", Email: "sarah@example.com", Age: 25 }
  ]);

  return (
    <div className="container-fluid vh-100 bg-light d-flex justify-content-center align-items-center p-4">
      <div className="w-100 bg-white rounded shadow p-4" style={{ maxWidth: '1000px' }}>
        <h2 className="mb-4 text-primary">User Management</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="align-middle">{user.Name}</td>
                  <td className="align-middle">{user.Email}</td>
                  <td className="align-middle">{user.Age}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> 
        <div className="d-flex justify-content-end mt-3">
              <Link to='/create' className="btn btn-primary" > Add New User</Link>
        </div>
      </div>
    </div>
  );
}

export default Users;