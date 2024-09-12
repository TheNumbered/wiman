import { Box, useTheme } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import RoleChangeRequests from '../pages/admin/RoleChangeRequests';
import UserBanManagement from '../pages/admin/UserBanManagement';
import BookingRequestsModal from '../pages/booking/BookingRequestsModal';
import MaintenancePage from '../pages/maintenance/MaintenancePage'; // Ensure path is correct
import SearchBar from './sidebar/SearchBar';
import Sidebar from './sidebar/Sidebar';

interface LayoutProps {
  children: ReactNode;
  hasSearch?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hasSearch = true }) => {
  const theme = useTheme();
  const [activePage, setActivePage] = useState<string>(''); // State to track the active page

  const handleSidebarItemClick = (page: string) => {
    setActivePage(page);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar onSidebarItemClick={handleSidebarItemClick} /> {/* Pass handler to Sidebar */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 1,
          display: 'flex',
          flexDirection: 'column',
          marginLeft: { xs: 0, md: 5 },
          marginRight: { xs: 0, md: 5 }, // Added for consistency
          overflowY: 'auto', // Ensure the main content is scrollable
          // Hide scrollbars but keep content scrollable
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          scrollbarWidth: 'none',
        }}
      >
        {hasSearch && <SearchBar />}
        {/* Render content based on the activePage */}
        {activePage === 'manage-users' && <UserBanManagement />}
        {activePage === 'role-change-requests' && <RoleChangeRequests />}
        {activePage === 'view-booking-requests' && <BookingRequestsModal />}
        {activePage === 'view-maintenance-requests' && <MaintenancePage />}
        {/* Render children if no page is active */}
        {!activePage && children}
      </Box>
    </Box>
  );
};

export default Layout;
