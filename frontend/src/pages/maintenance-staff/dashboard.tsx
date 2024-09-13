import AsideNav from '@/components/aside-nav';
import BottomNav from '@/components/bottom-nav';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import Issues from './maintenance-reports-layout';

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
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.up('sm'));
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
      <Box
        component={'main'}
        display={'flex'}
        sx={{ background: '#fff', maxWidth: '100vw', overflowX: 'hidden' }}
      >
        <Box component={'section'} bgcolor={'background.paper'} sx={{ pl: { md: 4 } }}>
          {isSmallScreen && <AsideNav onSelect={setSelectedPage} />}
        </Box>
        <Box
          component={'section'}
          sx={{
            background: '#fff',
            width: '-webkit-fill-available',
            overflowY: 'hidden',
            ml: { md: 1 }, // Margin-left only on large screens and up
            pr: { md: 2 }, // Padding-right only on large screens and up
            py: { md: 4 },
          }}
        >
          {/* DESKTOP SECTION */}
          {renderSelectedPage()}
        </Box>
        {!isSmallScreen && <BottomNav />}
      </Box>
    </>
  );
};
export default MaintenanceDashboard;
