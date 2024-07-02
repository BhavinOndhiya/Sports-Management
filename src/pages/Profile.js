// Profile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; // Import CSS for profile styles

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
          throw new Error('User not authenticated');
        }
        
        // Make a GET request to fetch user details
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers for authentication
          },
        });
        setUser(response.data.user); // Set user details in state
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
        setError(true); // Set error state if there's an issue
      } finally {
        setLoading(false); // Set loading state to false after attempt
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array ensures effect runs only once on component mount

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">Error fetching user profile. Please try again later.</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile Details</h2>
      </div>
      <div className="profile-details">
        <p><span className="label">Username:</span> <span className="value">{user.username}</span></p>
        <p><span className="label">Role:</span> <span className="value">{user.role}</span></p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default Profile;
