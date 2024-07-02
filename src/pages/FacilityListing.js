// FacilityListings.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FacilityListings() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const response = await axios.get('/api/facilities');
      setFacilities(response.data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  return (
    <div>
      <h2>Facility Listings</h2>
      <ul>
        {facilities.map(facility => (
          <li key={facility._id}>
            <strong>{facility.name}</strong> - {facility.location}<br />
            Price per Hour: ${facility.pricePerHour}<br />
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FacilityListings;
