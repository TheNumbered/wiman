import {
  BookmarksOutlined,
  DarkModeOutlined,
  DeleteOutline,
  FastForwardOutlined,
  HomeOutlined,
  KeyboardReturnOutlined,
  Menu as MenuIcon,
  NotificationsOutlined,
} from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import React from 'react';

const BottomNav = ({ onSelect }: { onSelect: (index: number) => void }) => {
  const [value, setValue] = React.useState(0);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleNavigationChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onSelect(newValue);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      {/* Bottom Navigation */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation showLabels value={value} onChange={handleNavigationChange}>
          {/* First 3 Navigation Items */}
          <BottomNavigationAction label="Home" icon={<HomeOutlined />} />
          <BottomNavigationAction label="Bookings" icon={<BookmarksOutlined />} />
          <BottomNavigationAction label="Activity" icon={<NotificationsOutlined />} />

          {/* Menu Button to open Drawer */}
          <BottomNavigationAction label="Menu" icon={<MenuIcon />} onClick={toggleDrawer(true)} />
        </BottomNavigation>
      </Paper>

      {/* Full Screen Drawer for the remaining items */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { height: '100%' } }}
      >
        <List>
          {/* Remaining Navigation Items */}
          <ListItem
            component="div"
            onClick={() => {
              setValue(3);
              onSelect(3);
              setDrawerOpen(false);
            }}
          >
            <ListItemIcon>
              <DarkModeOutlined />
            </ListItemIcon>
            <ListItemText primary="Dark Mode" />
          </ListItem>
          <ListItem
            component="div"
            onClick={() => {
              setValue(4);
              onSelect(4);
              setDrawerOpen(false);
            }}
          >
            <ListItemIcon>
              <DeleteOutline />
            </ListItemIcon>
            <ListItemText primary="Clear History" />
          </ListItem>
          <ListItem
            component="div"
            onClick={() => {
              setValue(5);
              onSelect(5);
              setDrawerOpen(false);
            }}
          >
            <ListItemIcon>
              <FastForwardOutlined />
            </ListItemIcon>
            <ListItemText primary="Wits Apps" />
          </ListItem>
          <ListItem
            component="div"
            onClick={() => {
              setValue(6);
              onSelect(6);
              setDrawerOpen(false);
            }}
          >
            <ListItemIcon>
              <KeyboardReturnOutlined />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default BottomNav;
