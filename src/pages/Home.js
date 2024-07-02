import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, Grid, Card, CardContent, CardActions, CircularProgress } from '@mui/material';
import './Home.css'; // Import your custom CSS for styling

const Home = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track authentication state

  useEffect(() => {
    checkAuthentication();
    fetchFacilities();
  }, []);

  const checkAuthentication = () => {
    // Example: Check if user is logged in (using localStorage for demo purpose)
    const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
    setIsLoggedIn(!!token); // Update isLoggedIn state based on token existence
  };

  const fetchFacilities = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/facilities');
      setFacilities(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching facilities:', error);
      setLoading(false);
    }
  };

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const nextPageFacilities = facilities.slice(page * 6, (page + 1) * 6);
      setFacilities([...facilities, ...nextPageFacilities]);
      setPage(page + 1);
      setLoading(false);
    }, 1000);
  };

  const handleBookFacility = (facilityId) => {
    console.log('Clicked on facility ID:', facilityId);
    if (!isLoggedIn) {
      alert('Please login to book the service.'); // Alert user to log in if not authenticated
      navigate('/login'); // Redirect to login page
    } else {
      // Proceed to booking page if authenticated
      navigate(`/booking/${facilityId}`);
    }
  };

  return (
    <Box className="home-container">
      <Typography variant="h4" className="home-header">
        Available Sports Facilities
      </Typography>
      <Grid container spacing={3}>
        {facilities.map((facility, index) => (
          <Grid item xs={12} sm={6} md={4} key={facility._id}>
            <Card className="facility-card">
              <CardContent className="facility-card-content">
                <div className="facility-details">
                  <Typography variant="h6" component="div">
                    Facility ID: {facility.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {facility.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price per Hour: ${facility.pricePerHour}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Amenities: {facility.amenities.join(', ')}
                  </Typography>
                </div>
                <CardActions className="facility-actions">
                  <Button
                    size="small"
                    onClick={() => handleBookFacility(facility.id)}
                    className="book-now-button"
                  >
                    Book Now
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {loading && (
          <Grid item xs={12} className="loading-indicator">
            <CircularProgress />
          </Grid>
        )}
        {facilities.length > 0 && <div ref={loaderRef} />}
      </Grid>
    </Box>
  );
};

export default Home;
