// src/components/SchedulingCalendar/SchedulingCalendar.js

import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import mockData from '../components/mockCalendarData';

const SchedulingCalendar = () => {
  // Extracting dates and statuses from mockData
  const calendarData = mockData[0]; // Assuming only one array in mockData for simplicity

  // Define styles for calendar cells based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'free':
        return '#4CAF50'; // Green for completely free
      case 'booked':
        return '#F44336'; // Red for fully booked
      case 'partial':
        return '#FFC107'; // Yellow for partially booked
      default:
        return '#FFFFFF'; // Default color
    }
  };

  return (
    <Box mt={3}>
      <Typography variant="h4" gutterBottom>
        Event Calendar
      </Typography>
      <Grid container spacing={3}>
        {calendarData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.date}>
            <Paper
              variant="outlined"
              square
              style={{
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: getStatusColor(item.status),
              }}
            >
              <Typography variant="h6" component="div" align="center" style={{ color: '#FFF' }}>
                {item.date}
              </Typography>
              <Typography variant="body1" align="center" style={{ color: '#FFF' }}>
                {item.status === 'free' ? 'Completely Free' : item.status === 'booked' ? 'Fully Booked' : 'Partially Booked'}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SchedulingCalendar;
