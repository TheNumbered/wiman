import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import RoleChangeRequests from './role-change';
import UserBanManagement from './user-ban';

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container
      sx={{ p: { xs: 2, md: 4 }, pt: { xs: 3, md: 0 }, maxWidth: '900px', margin: '0 auto' }}
    >
      <Typography variant="h4" gutterBottom color="primary" align="center">
        USER MANAGEMENT
      </Typography>

      {/* Tabs for switching between functionalities */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
        sx={{ marginBottom: 3 }}
      >
        <Tab label="Change Roles" />
        <Tab label="Ban/Unban Users" />
      </Tabs>

      {/* Render content based on active tab */}
      <Box>
        {activeTab === 0 && <RoleChangeRequests />}
        {activeTab === 1 && <UserBanManagement />}
      </Box>
    </Container>
  );
};

export default UserManagement;
