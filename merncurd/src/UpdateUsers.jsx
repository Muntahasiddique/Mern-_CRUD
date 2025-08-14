import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateUsers({ darkMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    profilePicture: null
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getUser/${id}`);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          age: response.data.age,
          profilePicture: response.data.profilePicture
        });
        if (response.data.profilePicture) {
          setProfilePicturePreview(`http://localhost:3001${response.data.profilePicture}`);
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch user data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicturePreview(URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('age', formData.age);
      if (formData.profilePicture && typeof formData.profilePicture !== 'string') {
        formDataToSend.append('profilePicture', formData.profilePicture);
      }

      await axios.put(`http://localhost:3001/updateUser/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/', { state: { success: 'User updated successfully!' } });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to update user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`loading-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="text-center">
          <div className={`spinner-grow ${darkMode ? 'text-neon' : 'text-primary'}`} 
            style={{ width: '3rem', height: '3rem' }} 
            role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="mt-3">Loading User Data...</h5>
        </div>
        
        <div className="aurora-effect"></div>
      </div>
    );
  }

  return (
    <div className={`update-user-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Background Elements */}
      <div className="aurora-background"></div>
      <div className="floating-particles"></div>

      <div className="glass-card rounded-4 p-4 mx-3">
        <div className='text-center mb-4'>
          <div className=''>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill={darkMode ? "#b88cf2" : "#6f42c1"} viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
          </div>
          <h2 className='fw-bold mb-2'>Update User</h2>
          <p className='form-subtitle'>Modify this user's details</p>
        </div>
        
        {error && (
          <div className="alert alert-neon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className=''>
            <label htmlFor="profilePicture" className='form-label'>PROFILE PICTURE</label>
            <div className="d-flex align-items-center mb-3">
              {profilePicturePreview ? (
                <img 
                  src={profilePicturePreview} 
                  alt="Preview" 
                  className="profile-preview"
                />
              ) : (
                <div className="default-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  </svg>
                </div>
              )}
              <div className="flex-grow-1">
                <input 
                  type="file" 
                  name="profilePicture"
                  id="profilePicture"
                  onChange={handleFileChange}
                  className='form-control'
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <div className='mb-4'>
            <label htmlFor="name" className='form-label'>FULL NAME</label>
            <div className="input-group">
              <span className="input-group-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
              </span>
              <input 
                type="text" 
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className='form-control'
                placeholder='Enter full name'
                required
              />
            </div>
          </div>
          
          <div className='mb-4'>
            <label htmlFor="email" className='form-label'>EMAIL ADDRESS</label>
            <div className="input-group">
              <span className="input-group-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                </svg>
              </span>
              <input 
                type="email" 
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className='form-control'
                placeholder='Enter email address'
                required
              />
            </div>
          </div>
          
          <div className='mb-4'>
            <label htmlFor="age" className='form-label'>AGE</label>
            <div className="input-group">
              <span className="input-group-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z"/>
                </svg>
              </span>
              <input 
                type="number" 
                name="age"
                id="age"
                value={formData.age}
                onChange={handleChange}
                className='form-control'
                placeholder='Enter age'
                min="1"
                max="120"
                required
              />
            </div>
          </div>
          
          <div className=' gap-3 mt-4'>
            <button 
              type='submit' 
              className={`btn btn-neon-purple rounded-pill py-2 fw-bold ${darkMode ? 'btn-neon-dark' : 'btn-neon-light'}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  UPDATING USER...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                  </svg>
                  UPDATE USER
                </>
              )}
            </button>
            
            <button
              type='button'
              className='btn btn-glass rounded-pill py-2'
              onClick={() => navigate('/')}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUsers;