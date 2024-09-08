import { Box, Typography } from '@mui/material';
import React from 'react';
import Calendar from 'react-calendar'; // Make sure to install `react-calendar`
import './RequestDateCalendar.css'; // Import the CSS file

const RequestDateCalendar: React.FC = () => {
  return (
    <Box className="calendar-container">
      <Typography className="calendar-title" variant="h5" gutterBottom>
        Request Date Calendar
      </Typography>
      <Box className="calendar-box">
        <Calendar />
      </Box>
    </Box>
  );
};

export default RequestDateCalendar;
