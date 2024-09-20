import {
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import HomeMobile from './home-mobile';
import HomeDesktop from './home-desktop';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      {isMobile ? (
        <HomeMobile/>
      ) : (
        <HomeDesktop />
      )}
    </Box>
  );
};

export default HomePage;