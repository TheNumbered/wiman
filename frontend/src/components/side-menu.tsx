import { Avatar, Box, Button, Typography } from '@mui/material';
import React from 'react';
import theme from '../theme';

const Sidemenu: React.FC = () => {
  return (
    <Box
      sx={{
        width: 250,
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        height: '100vh',
        position: 'fixed', // Fixes the sidebar in place
        overflowY: 'auto', // Allows scrolling within the sidebar if content overflows
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <Box display="flex">
          <Avatar
            sx={{
              width: 48,
              height: 48,
              mr: 2,
            }}
          />
          <Typography variant="h6" color="secondary">
            Sisekelo Ngcobo
          </Typography>
        </Box>
      </Box>
      <nav>
        <Box component="ul" p={0} m={0} sx={{ listStyle: 'none' }}>
          <Box component="li" mb={2}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ textAlign: 'left' }}
            >
              Home
            </Button>
          </Box>
          <Box component="li" mb={2}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ textAlign: 'left' }}
            >
              Booking
            </Button>
          </Box>
          <Box component="li" mb={2}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ textAlign: 'left' }}
            >
              Activity
            </Button>
          </Box>
          <Box component="li" mb={2}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ textAlign: 'left' }}
            >
              Profile
            </Button>
          </Box>
        </Box>
      </nav>
    </Box>
  );
};

export default Sidemenu;
