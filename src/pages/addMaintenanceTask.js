import React, { useState } from 'react';

const Maintenance = ({ addMaintenanceTask }) => {
  const [formData, setFormData] = useState({
    facility: '',
    description: '',
    date: '',
    time: '',
    frequency: '',
    status: 'Scheduled',
    technician: '',
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addMaintenanceTask(formData); // Ensure addMaintenanceTask is passed and used correctly
    // Reset form or perform other actions as needed
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Schedule Maintenance Task</h2>
      <form onSubmit={handleFormSubmit}>
        {/* Form inputs */}
        <button type="submit">Schedule Task</button>
      </form>
    </div>
  );
};

export default Maintenance;
