import { useGetQuery } from '@/hooks';
import { Users } from '@/interfaces';
import BannedPage from '@/pages/banned';
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
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [value, setValue] = useState(0);
  const { toggleColorMode } = useColorMode();
  const { signOut, userId } = useAuth();
  const isMobile = useMediaQuery('(max-width: 800px)');
  const {
    data: user,
    // isLoading,
    // isError,
  } = useGetQuery<{ role: Users['role']; banned: boolean }>({
    resource: 'api/user/role',
  });

  // if (isLoading || isError) return <></>;
  if (user?.banned) {
    <BannedPage />;
  }
  const userRole = user?.role;
  const primaryMenuItems: SidebarItemProps[] =
    userRole === 'admin'
      ? adminMenuItems
      : userRole === 'maintenance'
        ? maintenanceMenuItems
        : userMenuItems;
  const secondaryMenuItems: SidebarItemProps[] =
    userRole === 'admin' ? adminSecondaryMenuItems : profileMenuItems;

  if (userId) {
    localStorage.setItem('onesignalUserId', userId);
    if (user?.role) {
      localStorage.setItem('onesignalUserRole', user.role);
    }
  }

  const navigate = useNavigate();
  const handleNavigate = (route: string) => {
    navigate(route);
  };

  const handleProfileMenuClick = (label: string) => {
    if (label === 'Dark Mode') {
      toggleColorMode();
    }
    if (label === 'Log Out') {
      signOut();
    }
  };

  return (
    <>
      {!isMobile ? (
        <Box
          sx={{
            overflowY: 'hidden',
            height: '100vh',
            width: '16rem',
            bgcolor: 'background.paper',
            padding: 2,
          }}
        >
          <Box mb={4}>
            <img src="/LOGO.png" alt="Logo" />
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
              />
            ))}
          </List>
        </Box>
      ) : (
        <BottomNavigation
          value={value}
          onChange={(__, newValue) => {
            setValue(newValue);
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
          }}
        >
          {primaryMenuItems.map((item) => (
            <BottomNavigationAction key={item.label} label={item.label} icon={item.icon} />
          ))}
          <BottomNavigationAction label="Profile" icon={<AccountCircleOutlined />} />
        </BottomNavigation>
      )}
    </>
  );
};

export default SideBar;
