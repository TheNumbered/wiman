import { BlenderOutlined, CottageOutlined, HomeMaxRounded } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import React from 'react';

const BottomNav = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<HomeMaxRounded />} />
        <BottomNavigationAction label="Favorites" icon={<BlenderOutlined />} />
        <BottomNavigationAction label="Archive" icon={<CottageOutlined />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
