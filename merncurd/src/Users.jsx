import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users({ darkMode }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    if (!isOnline) {
      setError("You are offline. Please check your internet connection.");
      setLoading(false);
      return;
    }

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
    if (!isOnline) {
      alert("You are offline. Cannot delete user.");
      return;
    }

    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (!confirmDelete) return;
      
      await axios.delete(`http://localhost:3001/deleteUser/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  if (loading) return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <div className={`spinner-border ${darkMode ? 'text-neon' : 'text-primary'}`} 
          style={{ width: '3rem', height: '3rem', borderWidth: '0.25rem' }} 
          role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5 className="mt-3">
          {isOnline ? "INITIALIZING USER DATABASE..." : "OFFLINE - CONNECTION LOST"}
        </h5>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="cyber-alert p-4 rounded">
        <h4 className="mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="me-2" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
          {isOnline ? "DATABASE CONNECTION ERROR" : "OFFLINE MODE"}
        </h4>
        <p className="mb-4">{isOnline ? `ERROR CODE: ${error}` : "You are currently offline. Some features may not work."}</p>
        {isOnline && (
          <button className="btn btn-cyberpunk" onClick={fetchUsers}>
            RETRY CONNECTION
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-vh-100 p-4">
      <div className="container-fluid position-relative">
        <div className="cyber-card rounded-3 overflow-hidden">
          <div className="cyber-card-header p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                </svg>
                USER DATABASE
              </h2>
              <Link to='/create' className="btn btn-cyberpunk">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                NEW USER
              </Link>
            </div>
          </div>
          
          <div className="cyber-card-body p-0">
            {users.length === 0 ? (
              <div className="text-center py-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
                <h4 className="mt-3">
                  {isOnline ? "DATABASE EMPTY" : "OFFLINE - DATA MAY BE OUTDATED"}
                </h4>
                <p className="mb-4">
                  {isOnline ? "No user records found in the system" : "Connect to the internet to sync latest data"}
                </p>
                <Link to='/create' className="btn btn-cyberpunk px-4">
                  INITIALIZE USER
                </Link>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead>
                    <tr>
                      <th className="ps-4">NAME</th>
                      <th>EMAIL</th>
                      <th>AGE</th>
                      <th className="text-end pe-4">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} className="hover-glow">
                        <td className="ps-4">
                          {user.profilePicture ? (
                            <img 
                              src={`http://localhost:3001${user.profilePicture}`} 
                              alt={user.name} 
                              className="user-avatar"
                            />
                          ) : (
                            <div className="default-avatar">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                              </svg>
                            </div>
                          )}
                          <span className="fw-bold">{user.name}</span>
                        </td>
                        <td>
                          <a href={`mailto:${user.email}`} className="text-decoration-none email-link">
                            {user.email}
                          </a>
                        </td>
                        <td>{user.age}</td>
                        <td className="text-end pe-4">
                          <div className="d-flex justify-content-end gap-2">
                            <Link 
                              to={`/update/${user._id}`} 
                              className="btn btn-sm btn-cyberpunk-alt rounded-pill px-3"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                              </svg>
                              EDIT
                            </Link>
                            <button 
                              className="btn btn-sm btn-cyberpunk-alt rounded-pill px-3"
                              onClick={() => handleDelete(user._id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                              </svg>
                              DELETE
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <div className="cyber-card-footer p-3 text-center">
            <small>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
              </svg>
              SYSTEM STATUS: <span>{isOnline ? "ONLINE" : "OFFLINE"}</span> | 
              TOTAL USERS: <span>{users.length}</span>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;