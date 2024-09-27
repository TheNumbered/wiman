import { Block, Home } from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';

const BannedPage: React.FC = () => {
  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 4,
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: '500px',
          backgroundColor: 'white',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Block
          sx={{
            fontSize: '80px',
            color: 'red',
            marginBottom: 2,
          }}
        />

        <Typography variant="h3" gutterBottom color="text.primary">
          Account Suspended
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          Your account has been temporarily suspended due to a violation of our community
          guidelines. If you believe this is a mistake, please contact our support team.
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph>
          You will not be able to access your account or use any services until this ban is lifted.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Home />}
          sx={{ mt: 3, width: '100%' }}
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Return to Home
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          sx={{ mt: 2, width: '100%' }}
          onClick={() => {
            window.location.href = '/support';
          }}
        >
          Contact Support
        </Button>
      </Box>
    </Paper>
  );
};

export default BannedPage;
