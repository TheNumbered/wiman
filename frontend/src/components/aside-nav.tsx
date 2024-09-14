import {
  BookmarksOutlined,
  DarkModeOutlined,
  DeleteOutline,
  FastForwardOutlined,
  HomeOutlined,
  KeyboardReturnOutlined,
  NotificationsOutlined,
} from '@mui/icons-material';
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import Logo from '/LOGO.png';

interface AsideNavProps {
  onSelect: (index: number) => void;
}

const AsideNav: React.FC<AsideNavProps> = ({ onSelect }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    onSelect(index);
  };
  return (
    <Box
      sx={{
        overflowY: 'hidden',
        height: '100vh', // Full viewport height
        width: '16rem',
        bgcolor: 'background.paper', // Optional: background color for visibility
        // boxShadow: 1, // Optional: shadow for visual separation
        padding: 2, // Add padding around the box
      }}
    >
      <Box mb={4}>
        <img src={Logo}></img>
      </Box>
      <List component="nav">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          sx={{ mb: 1 }} // Add bottom margin to each item
        >
          <ListItemIcon>
            <HomeOutlined />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
          sx={{ mb: 1 }}
        >
          <ListItemIcon>
            <BookmarksOutlined />
          </ListItemIcon>
          <ListItemText primary="Bookings" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
          sx={{ mb: 1 }}
        >
          <ListItemIcon>
            <NotificationsOutlined />
          </ListItemIcon>
          <ListItemText primary="Activity" />
        </ListItemButton>
        <Divider sx={{ my: 2 }} /> {/* Add vertical margin to the divider */}
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
          sx={{ mb: 1 }}
        >
          <ListItemIcon>
            <DarkModeOutlined />
          </ListItemIcon>
          <ListItemText primary="Dark Mode" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
          sx={{ mb: 1 }}
        >
          <ListItemIcon>
            <DeleteOutline />
          </ListItemIcon>
          <ListItemText primary="Clear History" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5)}
          sx={{ mb: 1 }}
        >
          <ListItemIcon>
            <FastForwardOutlined />
          </ListItemIcon>
          <ListItemText primary="Other Wits Apps" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <KeyboardReturnOutlined />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItemButton>
      </List>
    </Box>
  );
};
export default AsideNav;
