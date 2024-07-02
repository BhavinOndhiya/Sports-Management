import React from 'react';
import axios from 'axios';

const Logout = ({ onLogout }) => {
    const handleLogout = async () => {
        try {
            // Make a request to your backend to invalidate the session or token
            await axios.post('/api/auth/logout'); // Example endpoint for logout

            // Clear token and user data from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Notify parent component about logout
            onLogout();
        } catch (error) {
            console.error('Logout failed', error);
            // Handle logout failure if needed
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
