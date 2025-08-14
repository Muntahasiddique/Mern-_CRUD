import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateUsers({ darkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    profilePicture: null
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      profilePicture: e.target.files[0]
    }));
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
      if (formData.profilePicture) {
        formDataToSend.append('profilePicture', formData.profilePicture);
      }

      await axios.post("http://localhost:3001/createUsers", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/', { state: { success: 'User created successfully!' } });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to create user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`create-user-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Background Elements */}
      <div className="cosmic-background"></div>
      <div className="twinkling-stars"></div>

      <div className="glass-card rounded-4 p-4 mx-3">
        <div className='text-center mb-2'>
          <div className='mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill={darkMode ? "#7ae1f9" : "#0d6efd"} viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            </svg>
          </div>
          <h2 className='fw-bold '>Create New User</h2>
          <p className='form-subtitle'>Add a new member to your community</p>
        </div>
        
        {error && (
          <div className="alert alert-neon ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className=''>
            <label htmlFor="profilePicture" className='form-label'>PROFILE PICTURE</label>
            <div className="input-group">
              <span className="input-group-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                  <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.18 1.987l-.463.11a1 1 0 0 0-.357.357l-.11.463A2 2 0 0 1 14 13zM2 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2z"/>
                </svg>
              </span>
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
          
          <div className=''>
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
          
          <div className='gap-3 mt-4'>
            <button 
              type='submit' 
              className={`btn btn-neon-primary rounded-pill py-2 fw-bold ${darkMode ? 'btn-neon-dark' : 'btn-neon-light'}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  CREATING USER...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                  </svg>
                  CREATE USER
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

export default CreateUsers;