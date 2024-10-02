import NotificationsIcon from '@mui/icons-material/Notifications'; // Import the notifications icon
import { Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import AnalyticsGraph from './charts/AnalyticsGraph';
import Notifications from './notifications';

import MaintenanceEfficiency from './charts/MaintenanceEfficiency';

const DashboardCards: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div style={{ position: 'relative' }}>
      <IconButton
        onClick={handleClick}
        style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1 }} // Position the icon
      >
        <NotificationsIcon />
      </IconButton>
      <Notifications anchorEl={anchorEl} onClose={handleClose} open={open} />{' '}
      {/* Pass props to Notifications */}
      <Grid container spacing={2} sx={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Booking Requests</Typography>
              <div style={{ height: '200px' }}>
                <AnalyticsGraph />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Maintenance Efficiency</Typography>
              <div style={{ height: '200px' }}>
                <MaintenanceEfficiency />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardCards;
