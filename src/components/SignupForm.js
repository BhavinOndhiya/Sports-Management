import React, { useState } from 'react';
import axios from 'axios';
import '../FormStyle.css'; // Import CSS for form styles

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { username, password, email});
      console.log(response.data); // Handle signup success
      // Optionally, you can navigate to login or show success message
    } catch (error) {
      setError('Signup failed. Please try again.'); // Handle signup error
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form className="form">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {/* <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} /> */}
        {error && <p className="error-message">{error}</p>}
        <button type="button" onClick={handleSignup}>Signup</button>
      </form>
    </div>
  );
};

export default SignupForm;
