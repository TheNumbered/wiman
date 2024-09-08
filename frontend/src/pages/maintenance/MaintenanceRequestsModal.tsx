import { Box, Button, Typography } from '@mui/material';
import React from 'react';

// Extended mock maintenance data
const mockMaintenanceRequests = [
  { id: 1, description: 'Replace lightbulb in office', status: 'Pending' },
  { id: 2, description: 'Fix leaking faucet in kitchen', status: 'Pending' },
  { id: 3, description: 'Service air conditioning unit', status: 'Pending' },
  { id: 4, description: 'Clean air ducts in conference room', status: 'Pending' },
  { id: 5, description: 'Repair office door lock', status: 'Pending' },
  { id: 6, description: 'Install new blinds in lobby', status: 'Pending' },
];

const MaintenanceRequestsModal: React.FC = () => {
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
        Maintenance Requests
      </Typography>
      <Box sx={{ maxHeight: '400px' }}>
        {mockMaintenanceRequests.map((request) => (
          <Box key={request.id} sx={{ mb: 2, p: 2, border: '1px solid', borderRadius: 1 }}>
            <Typography variant="body1">{`Description: ${request.description}`}</Typography>
            <Typography variant="body2">{`Status: ${request.status}`}</Typography>
            <Button variant="contained" color="success" sx={{ mr: 1 }}>
              Complete
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

export default MaintenanceRequestsModal;
