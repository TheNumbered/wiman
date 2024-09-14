import AsideNav from '@/components/aside-nav';
import BottomNav from '@/components/bottom-nav';
import { KeyboardArrowLeftRounded } from '@mui/icons-material';
import { Box, Grid2, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import Searchings from './home/searching';
import IssueReporting from './issue-reporting';
import SingleVenueDetails from './single-venue-details';

const Home = () => <Searchings />;
const Bookings = () => {
  return (
    <>
      {!useMediaQuery(useTheme().breakpoints.down('md')) && (
        <Box mb={2} sx={{ width: '100%', display: 'flex' }}>
          {/* <Typography><</Typography> */}
          <KeyboardArrowLeftRounded />
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Typography>Venue Details</Typography>
          </Box>
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* MAIN PAGE COMPONENT */}
        {!useMediaQuery(useTheme().breakpoints.down('md')) && (
          <Box sx={{ flex: '1' }}>
            <SingleVenueDetails />
          </Box>
        )}
        {/* ADDTIONAL INFO */}
        <Box
          pb={4}
          sx={{
            border: '1px solid #eee',
            borderRadius: '1rem',
            margin: '1rem',
            flex: '1',
            height: '100vh',
          }}
        >
          <IssueReporting />
        </Box>
      </Box>
    </>
  );
};
const Activity = () => <div>Activity Component</div>;
const DarkMode = () => <div>Dark Mode Component</div>;
const ClearHistory = () => <div>Clear History Component</div>;
const OtherApps = () => <div>Other Wits Apps Component</div>;

const Dashboard: React.FC = () => {
  const [selectedPage, setSelectedPage] = React.useState<number>(0);
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('md'));
  const renderSelectedPage = () => {
    switch (selectedPage) {
      case 0:
        return <Home />;
      case 1:
        return <Bookings />;
      case 2:
        return <Activity />;
      case 3:
        return <DarkMode />;
      case 4:
        return <ClearHistory />;
      case 5:
        return <OtherApps />;
      default:
        return <Bookings />; // Testing Purposes
    }
  };

  return (
    <>
      <Grid2
        container
        component={'main'}
        sx={{ display: '', maxWidth: '100vw', overflowX: 'hidden', background: '#fff' }}
      >
        {!isSmallScreen && (
          <Grid2
            size={3}
            component={'section'}
            bgcolor={'background.paper'}
            sx={{ px: { md: 4 }, height: '100vh', overflow: 'hidden' }}
          >
            <AsideNav onSelect={setSelectedPage} />
          </Grid2>
        )}
        <Grid2 component={'section'} size={{ md: 9, sm: 12 }}>
          <Box
            sx={{
              background: '#fff',
              ml: { md: 1 }, // Margin-left only on large screens and up
              pr: { md: 2 }, // Padding-right only on large screens and up
              py: { md: 4 },
              height: '100vh',
              overflowY: 'scroll',
            }}
          >
            {/* DESKTOP SECTION */}
            {renderSelectedPage()}
          </Box>
          {isSmallScreen && <BottomNav onSelect={setSelectedPage} />}
        </Grid2>
      </Grid2>
    </>
  );
};
export default Dashboard;
