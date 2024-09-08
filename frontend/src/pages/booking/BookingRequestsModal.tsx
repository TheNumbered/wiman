import { Box, Button, Typography } from '@mui/material';
import React from 'react';

// Extended mock booking data
const mockBookings = [
  { id: 1, name: 'John Doe', date: '2024-09-10', status: 'Pending' },
  { id: 2, name: 'Jane Smith', date: '2024-09-12', status: 'Pending' },
  { id: 3, name: 'Alice Johnson', date: '2024-09-15', status: 'Pending' },
  { id: 4, name: 'Robert Brown', date: '2024-09-17', status: 'Pending' },
  { id: 5, name: 'Emily Davis', date: '2024-09-20', status: 'Pending' },
  { id: 6, name: 'Michael Wilson', date: '2024-09-22', status: 'Pending' },
];

const BookingRequestsModal: React.FC = () => {
  return (
    <Box
      sx={{
        p: 2,
        flexGrow: 1,
        overflowY: 'auto', // Make sure the content area is scrollable
        '&::-webkit-scrollbar': {
          display: 'none', // Hide scrollbar in WebKit browsers
        },
        '-ms-overflow-style': 'none', // Hide scrollbar in Internet Explorer and Edge
        scrollbarWidth: 'none', // Hide scrollbar in Firefox
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        Booking Requests
      </Typography>
      <Box sx={{ maxHeight: '400px' }}>
        {mockBookings.map((booking) => (
          <Box key={booking.id} sx={{ mb: 2, p: 2, border: '1px solid', borderRadius: 1 }}>
            <Typography variant="body1">{`Name: ${booking.name}`}</Typography>
            <Typography variant="body2">{`Date: ${booking.date}`}</Typography>
            <Typography variant="body2">{`Status: ${booking.status}`}</Typography>
            <Button variant="contained" color="success" sx={{ mr: 1 }}>
              Accept
            </Button>
            <Button variant="outlined" color="error">
              Reject
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BookingRequestsModal;
