import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getUser/${id}`);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          age: response.data.age
        });
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch user data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [id]);

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
      await axios.put(`http://localhost:3001/updateUser/${id}`, formData);
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
      <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='d-flex vh-100 bg-light justify-content-center align-items-center'>
      <div className='w-md-50 w-100 bg-white rounded-4 shadow p-4 mx-3' style={{ maxWidth: '500px' }}>
        <form onSubmit={handleSubmit}>
          <div className='text-center mb-4'>
            <h2 className='fw-bold text-primary'>Update User</h2>
            <p className='text-muted'>Edit the user details</p>
          </div>
          
          {error && <div className="alert alert-danger">{error}</div>}

          <div className='mb-3'>
            <label htmlFor="name" className='form-label fw-semibold'>Full Name</label>
            <input 
              type="text" 
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter full name' 
              className='form-control py-2'
              required
            />
          </div>
          
          <div className='mb-3'>
            <label htmlFor="email" className='form-label fw-semibold'>Email Address</label>
            <input 
              type="email" 
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter email address' 
              className='form-control py-2'
              required
            />
          </div>
          
          <div className='mb-4'>
            <label htmlFor="age" className='form-label fw-semibold'>Age</label>
            <input 
              type="number" 
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
              placeholder='Enter age' 
              className='form-control py-2'
              min="1"
              max="120"
              required
            />
          </div>
          
          <div className='d-grid gap-2'>
            <button 
              type='submit' 
              className='btn btn-primary py-2 fw-semibold rounded-3'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update User'}
            </button>
            <button
              type='button'
              className='btn btn-outline-secondary py-2 rounded-3'
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;