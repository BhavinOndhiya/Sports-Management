import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Snackbar } from '@mui/material'; // Assuming you are using Material-UI

const Maintenance = () => {
  const [facilityId, setFacilityId] = useState('');
  const [maintenanceDate, setMaintenanceDate] = useState('');
  const [description, setDescription] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('/api/maintenance', {
        facilityId,
        maintenanceDate,
        description
      });

      if (response.status === 201) {
        setSnackbarMessage('Maintenance task logged successfully');
        setOpenSnackbar(true);
        // Optionally reset form fields or update state as needed
      } else {
        setSnackbarMessage('Failed to log maintenance task');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error logging maintenance:', error);
      setSnackbarMessage('Failed to log maintenance task');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <h2>Maintenance Logging</h2>
      <form onSubmit={handleFormSubmit}>
        <TextField
          type="text"
          label="Facility ID"
          value={facilityId}
          onChange={(e) => setFacilityId(e.target.value)}
          required
        />
        <br />
        <TextField
          type="date"
          label="Maintenance Date"
          value={maintenanceDate}
          onChange={(e) => setMaintenanceDate(e.target.value)}
          required
        />
        <br />
        <TextField
          type="text"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          required
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Log Maintenance
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Maintenance;
