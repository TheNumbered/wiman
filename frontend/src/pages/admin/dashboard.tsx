import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import AnalyticsGraph from './charts/AnalyticsGraph';
import MaintenanceBudget from './charts/MaintenanceBudget';
import MaintenanceEfficiency from './charts/MaintenanceEfficiency';
import UserActivity from './charts/UserActivity';

const DashboardCards: React.FC = () => {
  return (
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

      <Grid item xs={12} sm={6} md={6}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6">User Activity</Typography>
            <div style={{ height: '200px' }}>
              <UserActivity />
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6">Maintenance Budget</Typography>
            <div style={{ height: '200px' }}>
              <MaintenanceBudget />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardCards;
