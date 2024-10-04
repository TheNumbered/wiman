import { useGetQuery } from '@/hooks';
import { useClearHistory } from '@/hooks/clear-history';
import { Users } from '@/interfaces';
import { useColorMode } from '@/theme-provider';
import { useAuth } from '@clerk/clerk-react';
import { AccountCircleOutlined } from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Divider,
  List,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OtherWitsAppsModal from '../other-wits-apps';
import SidebarItem from './item';
import {
  adminMenuItems,
  adminSecondaryMenuItems,
  maintenanceMenuItems,
  profileMenuItems,
  userMenuItems,
} from './menu-items';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  route?: string;
}

const SideBar: React.FC = () => {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null); // Track selected label
  const [openModal, setOpenModal] = useState(false);
  const { toggleColorMode } = useColorMode();
  const { signOut } = useAuth();
  const { clearHistory } = useClearHistory();
  const isMobile = useMediaQuery('(max-width: 800px)');
  const { data: user } = useGetQuery<{ role: Users['role']; banned: boolean }>({
    resource: 'api/user/role',
  });

  const navigate = useNavigate();
  const theme = useTheme();

  const userRole = user?.role;
  const primaryMenuItems: SidebarItemProps[] =
    userRole === 'admin'
      ? adminMenuItems
      : userRole === 'maintenance'
        ? maintenanceMenuItems
        : userMenuItems;

  const secondaryMenuItems: SidebarItemProps[] =
    userRole === 'admin' ? adminSecondaryMenuItems : profileMenuItems;

  // Set the first item as the default selected label if none is selected
  useEffect(() => {
    if (!selectedLabel && primaryMenuItems.length > 0) {
      setSelectedLabel(primaryMenuItems[0]?.route || primaryMenuItems[0].label);
    }
  }, [selectedLabel, primaryMenuItems]);

  const handleNavigate = (route: string) => {
    navigate(route);
    setSelectedLabel(route); // Update selected label
  };

  const handleProfileMenuClick = (label: string) => {
    if (label === 'Dark Mode') {
      toggleColorMode();
    }
    if (label === 'Log Out') {
      signOut();
    }
    if (label === 'Clear History') {
      clearHistory();
    }
    if (label === 'Other Wits Apps') {
      setOpenModal(true); // Open modal for Wits Apps
    }
    if (label === 'Profile') {
      handleNavigate('/profile'); // Make sure to define the correct route for the profile
    }
    setSelectedLabel(label); // Update selected label for profile items
  };

  return (
    <>
      {!isMobile ? (
        <Box
          sx={{
            overflow: 'hidden',
            height: '100vh',
            width: '16rem',
            bgcolor: 'background.paper',
            padding: 2,
          }}
        >
          <Box mb={4}>
            <img
              src={theme.palette.mode === 'dark' ? '/logo_1000w_dark.png' : '/logo_1000w.png'}
              alt="Logo"
              width={'250px'}
            />
          </Box>
          <List component="nav">
            {primaryMenuItems.map((item) => (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                onClick={() => {
                  if (item.route) handleNavigate(item.route);
                  if (!item.route) handleProfileMenuClick(item.label);
                }}
                selected={selectedLabel === item.route || selectedLabel === item.label} // Pass selected prop
              />
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <List component="nav">
            {secondaryMenuItems.map((item) => (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                onClick={() => {
                  if (item.route) handleNavigate(item.route);
                  if (!item.route) handleProfileMenuClick(item.label);
                }}
                selected={selectedLabel === item.route || selectedLabel === item.label} // Pass selected prop
              />
            ))}
          </List>
        </Box>
      ) : (
        <BottomNavigation
          showLabels
          value={primaryMenuItems.findIndex((item) => item.route === selectedLabel)}
          onChange={(_, newValue) => {
            if (newValue === primaryMenuItems.length) {
              handleNavigate('/profile');
              setSelectedLabel('Profile');
              return;
            }
            setSelectedLabel(primaryMenuItems[newValue].route || primaryMenuItems[newValue].label);
            if (primaryMenuItems[newValue].route) handleNavigate(primaryMenuItems[newValue].route);
            if (!primaryMenuItems[newValue].route)
              handleProfileMenuClick(primaryMenuItems[newValue].label);
          }}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1100,
            bgcolor: 'background.paper',
            padding: '2.5rem 1rem',
            borderTop: '1px solid #999',
          }}
        >
          {primaryMenuItems.map((item) => (
            <BottomNavigationAction
              key={item.label}
              label={item.label.split(' ')[1] || item.label}
              icon={item.icon}
            />
          ))}
          <BottomNavigationAction label="Profile" icon={<AccountCircleOutlined />} />
        </BottomNavigation>
      )}
      <OtherWitsAppsModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default SideBar;
