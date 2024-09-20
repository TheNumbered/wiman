import { Box, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import HomeDesktop from './home-desktop';
import HomeMobile from './home-mobile';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return <Box>{isMobile ? <HomeMobile /> : <HomeDesktop />}</Box>;
};

export default HomePage;
