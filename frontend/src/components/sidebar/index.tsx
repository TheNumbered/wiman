import { useGetQuery } from '@/hooks';
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
  profileMenuItems,
  userMenuItems,
} from './menu-items';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  route?: string;
}

const SideBar: React.FC = () => {
  const [value, setValue] = useState(0);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { data: user } = useGetQuery<{ role: string }>({
    resource: 'api/user/role',
  });
  const userRole = user?.role;
  const primaryMenuItems: SidebarItemProps[] =
    userRole === 'admin' ? adminMenuItems : userMenuItems;
  const secondaryMenuItems: SidebarItemProps[] =
    userRole === 'admin' ? adminSecondaryMenuItems : profileMenuItems;

  const navigate = useNavigate();
  const handleNavigate = (route: string) => {
    navigate(route);
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
            <img src="./LOGO.png" alt="Logo" />
          </Box>
          <List component="nav">
            {primaryMenuItems.map((item) => (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                onClick={() => {
                  if (item.route) handleNavigate(item.route);
                  if (item.onClick) item.onClick();
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
                  if (item.onClick) item.onClick();
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
            if (primaryMenuItems[newValue].onClick) primaryMenuItems[newValue].onClick();
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
