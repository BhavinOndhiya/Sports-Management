import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingSystem.css'; // Import your custom CSS for styling

function BookingSystem() {
  const { facilityId } = useParams();
  const [facility, setFacility] = useState(null);
  const [loadingFacility, setLoadingFacility] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [bookingDuration, setBookingDuration] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchFacilityDetails = async () => {
      setLoadingFacility(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/facilities/${facilityId}`);
        setFacility(response.data);
        setLoadingFacility(false);
      } catch (error) {
        console.error('Error fetching facility details:', error);
        setError('Failed to fetch facility details');
        setLoadingFacility(false);
      }
    };

    if (facilityId) {
      fetchFacilityDetails();
    }
  }, [facilityId]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      setLoadingSlots(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/facilities/${facilityId}/slots`, {
          params: { date: selectedDate.toISOString().split('T')[0] },
        });
        setSlots(response.data.availableSlots); // Assuming response.data is an array of strings like ["09:00", "10:00", ...]
        setLoadingSlots(false);
      } catch (error) {
        console.error('Error fetching available slots:', error);
        setError('Failed to fetch available slots');
        setLoadingSlots(false);
      }
    };

    if (facilityId && selectedDate) {
      fetchAvailableSlots();
    }
  }, [facilityId, selectedDate]);

  const handleTimeSelection = (time) => {
    if (!selectedStartTime) {
      setSelectedStartTime(time);
      setSelectedEndTime('');
    } else if (!selectedEndTime && time !== selectedStartTime) {
      if (time < selectedStartTime) {
        setSelectedEndTime(selectedStartTime);
        setSelectedStartTime(time);
      } else {
        setSelectedEndTime(time);
      }
    } else {
      setSelectedStartTime(time);
      setSelectedEndTime('');
    }
  };
  

  useEffect(() => {
    if (selectedStartTime && selectedEndTime) {
      const startTime = new Date(`2000-01-01T${selectedStartTime}`);
      const endTime = new Date(`2000-01-01T${selectedEndTime}`);
      const durationInHours = (endTime - startTime) / (1000 * 60 * 60);
      const totalPrice = durationInHours * facility.pricePerHour;
      setTotalPrice(totalPrice);
    } else {
      setTotalPrice(0);
    }
  }, [selectedStartTime, selectedEndTime, facility]);

  const handleBooking = async () => {
    try {
      if (!selectedStartTime || !selectedEndTime) {
        setError('Please select a valid time range.');
        return;
      }

      const bookings = [];
      let startTime = selectedStartTime;
      while (startTime <= selectedEndTime) {
        bookings.push({
          facilityId,
          date: selectedDate.toISOString().split('T')[0],
          time: startTime,
          duration: bookingDuration,
        });
        const nextHour = parseInt(startTime.split(':')[0], 10) + 1;
        startTime = `${nextHour.toString().padStart(2, '0')}:00`;
      }
      // Simulate the booking locally since we don't have an API to store this batch booking yet
      console.log('Bookings to be made:', bookings);

      alert('Booking successful!');
      setSelectedStartTime('');
      setSelectedEndTime('');
    } catch (error) {
      console.error('Error making booking:', error);
      setError('Failed to make booking');
    }
  };

  if (loadingFacility || loadingSlots) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!facility) {
    return <div>No facility found</div>;
  }

  return (
    <div className="booking-system-container">
      <h2>Book {facility.name}</h2>
      <div className="facility-details">
        <p>ID: {facility.id}</p>
        <p>Location: {facility.location}</p>
        <p>Price per Hour: ${facility.pricePerHour}</p>
        <p>Amenities: {facility.amenities.join(', ')}</p>
      </div>

      <div className="booking-options">
        <h3>Select Date</h3>
        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />

        <h3>Select Time Range</h3>
        <div className="time-slots">
          {slots.map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelection(time)}
              className={
                (time >= selectedStartTime && time <= selectedEndTime)
                  ? 'selected-time'
                  : (time > selectedStartTime && time <= selectedEndTime)
                  ? 'in-range-time'
                  : ''
              }
            >
              {time}
            </button>
          ))}
        </div>

        <div className="duration-selection">
          <label>Booking Duration (hours):</label>
          <input
            type="number"
            value={bookingDuration}
            onChange={(e) => setBookingDuration(parseInt(e.target.value, 10) || 1)}
            min={1}
          />
        </div>

        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>

        <button onClick={handleBooking} disabled={!selectedStartTime || !selectedEndTime}>Book Now</button>
      </div>
    </div>
  );
}

export default BookingSystem;
