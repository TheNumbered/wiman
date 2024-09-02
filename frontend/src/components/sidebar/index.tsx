import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery, useTheme } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import React from 'react';
import { Link } from 'react-router-dom';

// Define a type for sidebar item
interface SidebarItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

// Define a component for individual sidebar items
const SidebarItem: React.FC<SidebarItem> = ({ to, icon, label }) => {
  const theme = useTheme();

  return (
    <Button
      component={Link}
      to={to}
      startIcon={icon}
      fullWidth
      sx={{
        justifyContent: 'flex-start',
        mb: 1,
        border: '2px solid transparent',
        borderRadius: '8px',
        transition: 'border-color 0.3s',
        '&:hover': {
          borderColor: theme.palette.primary.main,
        },
        textTransform: 'none', // Ensures text isn't all caps
      }}
    >
      <Typography variant="body1">{label}</Typography>
    </Button>
  );
};

// Define the Sidebar component
const Sidebar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const mainItems: SidebarItem[] = [
    { to: '/home', icon: <HomeOutlinedIcon />, label: 'Home' },
    { to: '/bookings', icon: <EventNoteOutlinedIcon />, label: 'Bookings' },
    { to: '/activity', icon: <NotificationsNoneOutlinedIcon />, label: 'Activity' },
    { to: '/profile', icon: <AccountCircleOutlinedIcon />, label: 'Account' },
  ];

  const settingsItems: SidebarItem[] = [
    { to: '#', icon: <DarkModeOutlinedIcon />, label: 'Dark mode' },
    { to: '#', icon: <HistoryOutlinedIcon />, label: 'Clear history' },
    { to: '#', icon: <AppsOutlinedIcon />, label: 'Other Wits apps' },
  ];

  const logoutItem: SidebarItem = {
    to: '/logout',
    icon: <LogoutOutlinedIcon />,
    label: 'Logout',
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
              key={item.to}
              label={item.label}
              icon={item.icon}
              component={Link}
              to={item.to}
            />
          ))}
        </BottomNavigation>
      ) : (
        <Drawer variant="permanent" sx={{ width: 240, overflow: 'hidden', borderRadius: 0 }}>
          <img src="/logo.jpg" alt="Logo" style={{ width: '200px', height: 'auto' }} />
          <Box
            sx={{
              width: 240,
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              boxSizing: 'border-box',
              overflow: 'hidden',
              borderRadius: 0,
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              {/* Main items */}
              {mainItems.map((item) => (
                <SidebarItem key={item.to} {...item} />
              ))}
              <Divider sx={{ my: 2 }} />
              {/* Settings items */}
              {settingsItems.map((item) => (
                <SidebarItem key={item.to} {...item} />
              ))}
            </Box>
            <Box>
              <Divider sx={{ my: 2 }} />
              {/* Logout item */}
              <SidebarItem {...logoutItem} />
            </Box>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
