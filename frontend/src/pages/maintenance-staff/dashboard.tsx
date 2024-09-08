import AsideNav from '@/components/aside-nav';
import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import Issues from './maintenance-issues';

const Home = () => <Issues />;
const Bookings = () => {
  return <div>Activity Component</div>;
};
const Activity = () => <div>Activity Component</div>;
const DarkMode = () => <div>Dark Mode Component</div>;
const ClearHistory = () => <div>Clear History Component</div>;
const OtherApps = () => <div>Other Wits Apps Component</div>;

const MaintenanceDashboard: React.FC = () => {
  const [selectedPage, setSelectedPage] = React.useState<number>(0);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
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
        return <Home />; // Default to Home if no match
    }
  };

  return (
    <>
      <Box component={'main'} sx={{ display: 'flex', maxWidth: '100vw', overflowX: 'hidden' }}>
        <Box component={'section'} bgcolor={'background.paper'} px={4}>
          {isSmallScreen ? <div>Bottom Nav</div> : <AsideNav onSelect={setSelectedPage} />}
        </Box>
        <Box component={'section'} sx={{ background: '#fff' }}>
          <Box ml={1} mr={6} py={4}>
            {/* DESKTOP SECTION */}
            {renderSelectedPage()}
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default MaintenanceDashboard;
