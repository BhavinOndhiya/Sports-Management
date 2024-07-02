// ReservationApproval.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/auth'; // Assuming you have an auth hook for user role

function ReservationApproval() {
  const { userRole } = useAuth(); // Example hook to get user role
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('/api/reservations');
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const handleApprove = async (reservationId) => {
    try {
      const response = await axios.put(`/api/reservations/${reservationId}/approve`);
      console.log('Reservation approved:', response.data);
      // Update local state or UI accordingly
      fetchReservations(); // Refresh reservations after approval
    } catch (error) {
      console.error('Approval error:', error);
      // Handle error, e.g., show error message
    }
  };

  return (
    <div>
      <h2>Reservation Approval</h2>
      {reservations.map(reservation => (
        <div key={reservation._id}>
          <p>User: {reservation.user.username}</p>
          <p>Facility: {reservation.facility.name}</p>
          <p>Date: {reservation.date}</p>
          <p>Status: {reservation.status}</p>
          {userRole === 'admin' && reservation.status === 'pending' && (
            <button onClick={() => handleApprove(reservation._id)}>Approve</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ReservationApproval;
