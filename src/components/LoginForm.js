import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import '../FormStyle.css'; // Import CSS for form styles

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      const token = response.data.token; // Extract token from response
      localStorage.setItem('token', token); // Store token in localStorage
      onLogin(token); // Notify parent component (App.js) of successful login
    } catch (error) {
      setError('Invalid credentials. Please try again.'); // Handle login error
    }
  };

  // Redirect to home page if logged in
  if (localStorage.getItem('token')) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form className="form">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="error-message">{error}</p>}
        <button type="button" onClick={handleLogin}>Login</button>
        <Link to="/signup">Sign Up</Link> {/* Link to Signup page */}
      </form>
    </div>
  );
};

export default LoginForm;
