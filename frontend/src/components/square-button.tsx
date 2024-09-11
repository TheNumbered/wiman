import { Box, Typography } from '@mui/material';
import React from 'react';

interface SquareButtonProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const SquareButton: React.FC<SquareButtonProps> = ({ icon, title, subtitle }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '32%', // Adjust size to make it a square
        height: 130, // Adjust size to make it a square
        padding: 3,
        background: '#E6ECF0',
        color: '#79747E',
        borderRadius: '1rem',
      }}
    >
      <Box sx={{ color: '#fff' }}>{icon}</Box>
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2">{subtitle}</Typography>
      </Box>
    </Box>
  );
};

export default SquareButton;
