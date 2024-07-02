import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline, Box, createTheme, ThemeProvider } from '@mui/material';
import Header from './components/Header';
import Home from './pages/Home';
import BookingSystem from './pages/BookingSystem';
import Maintenance from './pages/Maintenance';
import Profile from './pages/Profile';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignupForm';
import SchedulingCalendar from './components/SchedulingCalendar';
import MaintenanceScheduler from './pages/Maintenance'; // Correct import name
import MaintenanceLogs from './pages/MaintenanceLogs';
import Logout from './components/Logout';

axios.defaults.baseURL = 'http://localhost:5000';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black color
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [maintenanceTasks, setMaintenanceTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Clear user object from localStorage
  };

  const addMaintenanceTask = (newTask) => {
    setMaintenanceTasks([...maintenanceTasks, newTask]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <Box component="main" flexGrow={1} p={3}>
            <Routes>
              <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
              <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
              <Route path="/booking" element={isLoggedIn ? <BookingSystem /> : <Navigate to="/login" />} />
              <Route path="/maintenance" element={isLoggedIn ? <Maintenance addMaintenanceTask={addMaintenanceTask} /> : <Navigate to="/login" />} />
              <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
              <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <LoginForm onLogin={handleLogin} />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/calendar" element={isLoggedIn ? <SchedulingCalendar /> : <Navigate to="/login" />} />
              <Route path="/schedule-maintenance" element={isLoggedIn ? <MaintenanceScheduler addMaintenanceTask={addMaintenanceTask} /> : <Navigate to="/login" />} />
              <Route path="/maintenance-logs" element={isLoggedIn ? <MaintenanceLogs maintenanceLogs={maintenanceTasks} /> : <Navigate to="/login" />} />
              <Route path="/booking/:facilityId" element={isLoggedIn ? <BookingSystem /> : <Navigate to="/login" />} />
              <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
              {/* Add a catch-all route for unmatched paths */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
