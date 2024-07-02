import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Header.css'; // Import your custom CSS file

const Header = ({ onLogout }) => {

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout'); // Example endpoint for logout

      // Clear any local storage or cookies used for authentication
      localStorage.removeItem('token'); // Example: Clear token from localStorage
      localStorage.removeItem('user'); // Example: Clear user data from localStorage

      // Notify parent component about logout
      onLogout();
    } catch (error) {
      console.error('Logout failed', error);
      // Handle logout failure if needed
    }
  };

  return (
    <div className="appBar"> {/* Apply custom className */}
      <div className="toolbar"> {/* Apply custom className */}
        <Link to="/" className="iconButton">
          Home
        </Link>
        <Link to="/booking" className="iconButton">
          Booking
        </Link>
        <Link to="/maintenance" className="iconButton">
          Maintenance
        </Link>
        <Link to="/profile" className="iconButton">
          Profile
        </Link>
        <span className="iconButton" onClick={handleLogout}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default Header;
