import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery, useTheme } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import React from 'react';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  page: string; // Changed to page identifier
}

interface SidebarProps {
  onSidebarItemClick: (page: string) => void; // No optional handler
}

const SidebarItem: React.FC<SidebarItem & { onClick: () => void }> = ({ icon, label, onClick }) => {
  const theme = useTheme();

  return (
    <Button
      startIcon={icon}
      fullWidth
      onClick={onClick} // Trigger the onClick handler
      sx={{
        justifyContent: 'flex-start',
        mb: 1,
        border: '2px solid transparent',
        borderRadius: '8px',
        transition: 'border-color 0.3s',
        '&:hover': {
          borderColor: theme.palette.primary.main,
        },
        textTransform: 'none',
      }}
    >
      <Typography variant="body1">{label}</Typography>
    </Button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ onSidebarItemClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const mainItems: SidebarItem[] = [
    { icon: <GroupOutlinedIcon />, label: 'Manage Users', page: 'manage-users' },
    { icon: <AssignmentOutlinedIcon />, label: 'Role Change', page: 'role-change-requests' },
    { icon: <EventAvailableOutlinedIcon />, label: 'View Bookings', page: 'view-booking-requests' },
    { icon: <BuildOutlinedIcon />, label: 'View Maintenance', page: 'view-maintenance-requests' },
    { icon: <AccountCircleOutlinedIcon />, label: 'Account', page: 'account' },
  ];

  const settingsItems: SidebarItem[] = [
    { icon: <DarkModeOutlinedIcon />, label: 'Dark Mode', page: 'dark-mode' },
    { icon: <AppsOutlinedIcon />, label: 'Other Wits Apps', page: 'other-apps' },
  ];

  const logoutItem: SidebarItem = {
    icon: <LogoutOutlinedIcon />,
    label: 'Logout',
    page: 'logout',
  };

  return (
    <>
      {isMobile ? (
        <BottomNavigation
          showLabels
          sx={{ position: 'fixed', bottom: 0, width: '100%', bgcolor: 'background.paper' }}
        >
          {mainItems.map((item) => (
            <BottomNavigationAction
              key={item.page}
              label={item.label}
              icon={item.icon}
              onClick={() => onSidebarItemClick(item.page)} // Pass page identifier
            />
          ))}
        </BottomNavigation>
      ) : (
        <Drawer variant="permanent" sx={{ width: 240, overflow: 'hidden', borderRadius: 0 }}>
          <Box
            sx={{
              width: 240,
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              boxSizing: 'border-box',
              overflow: 'hidden',
              borderRadius: 0,
            }}
          >
            {/* Logo Section */}
            <Box
              sx={{
                mb: 5, // Increased margin-bottom to push items down
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60px',
              }}
            >
              <img src="/logo.jpg" alt="Logo" style={{ width: '200px', height: 'auto' }} />
            </Box>
            {/* Scrollable Main Items */}
            <Box
              sx={{
                flexGrow: 1,
                overflowY: 'scroll', // Allows scrolling
                overflowX: 'hidden', // Hides horizontal scrollbar if any
                padding: 2,
                '&::-webkit-scrollbar': {
                  display: 'none', // Hides scrollbar in WebKit browsers
                },
                '-ms-overflow-style': 'none', // Hides scrollbar in Internet Explorer and Edge
                scrollbarWidth: 'none', // Hides scrollbar in Firefox
              }}
            >
              {mainItems.map((item) => (
                <SidebarItem
                  key={item.page}
                  {...item}
                  onClick={() => onSidebarItemClick(item.page)} // Pass page identifier
                />
              ))}
              <Divider sx={{ my: 2 }} />
              {settingsItems.map((item) => (
                <SidebarItem
                  key={item.page}
                  {...item}
                  onClick={() => onSidebarItemClick(item.page)}
                />
              ))}
            </Box>
            <Box>
              <Divider sx={{ my: 2 }} />
              <SidebarItem {...logoutItem} onClick={() => onSidebarItemClick(logoutItem.page)} />
            </Box>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
