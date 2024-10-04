import OtherWitsAppsModal from '@/components/other-wits-apps';
import { useClearHistory } from '@/hooks/clear-history';
import { useColorMode } from '@/theme-provider';
import { useAuth, useUser } from '@clerk/clerk-react';
import {
  ArrowBackIosNew,
  DarkModeOutlined,
  DeleteOutline,
  EventAvailableOutlined,
  FastForwardOutlined,
  KeyboardReturnOutlined,
} from '@mui/icons-material';
import { Avatar, Box, Button, Divider, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MobileProfilePage: React.FC = () => {
  const { toggleColorMode } = useColorMode();
  const { signOut } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const { clearHistory } = useClearHistory();

  const [openModal, setOpenModal] = useState(false);

  const handleActionClick = async (action: string) => {
    switch (action) {
      case 'Dark Mode':
        toggleColorMode();
        break;
      case 'My Bookings':
        navigate('/bookings');
        break;
      case 'Log Out':
        signOut();
        break;
      case 'Other Wits Apps':
        setOpenModal(true); // Open modal for Wits Apps
        break;
      default:
        break;
    }
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bgcolor="background.paper">
      {/* Back Button and Title */}
      <Box display="flex" alignItems="center" p={2}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIosNew />
        </IconButton>
        <Typography variant="h6" ml={2}>
          Profile
        </Typography>
      </Box>

      {/* User Avatar and Name */}
      <Box display="flex" flexDirection="column" alignItems="center" mt={2} mb={2}>
        <Avatar
          alt="user-icon"
          src={user?.imageUrl ?? 'https://openui.fly.dev/openui/24x24.svg?text=👤'}
          sx={{ width: 64, height: 64, bgcolor: 'primary.light', mb: 1 }}
        />
        <Typography variant="body1" sx={{ color: 'grey.500' }}>
          {user?.firstName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'grey.400' }}>
          {user?.emailAddresses[0]?.emailAddress}
        </Typography>
      </Box>

      <Divider />

      {/* Action List */}
      <Box p={2}>
        <Button
          fullWidth
          startIcon={<DarkModeOutlined />}
          onClick={() => handleActionClick('Dark Mode')}
          sx={{
            justifyContent: 'flex-start',
            textTransform: 'none',
            color: 'text.primary',
            mb: 1,
          }}
        >
          Dark Mode
        </Button>

        <Button
          fullWidth
          startIcon={<EventAvailableOutlined />}
          onClick={() => handleActionClick('My Bookings')}
          sx={{
            justifyContent: 'flex-start',
            textTransform: 'none',
            color: 'text.primary',
            mb: 1,
          }}
        >
          My Bookings
        </Button>
        <Button
          fullWidth
          startIcon={<DeleteOutline />}
          onClick={clearHistory}
          sx={{
            justifyContent: 'flex-start',
            textTransform: 'none',
            color: 'text.primary',
            mb: 1,
          }}
        >
          Clear History
        </Button>
        <Button
          fullWidth
          startIcon={<FastForwardOutlined />}
          onClick={() => handleActionClick('Other Wits Apps')}
          sx={{
            justifyContent: 'flex-start',
            textTransform: 'none',
            color: 'text.primary',
            mb: 1,
          }}
        >
          Other Wits Apps
        </Button>

        <Button
          fullWidth
          startIcon={<KeyboardReturnOutlined sx={{ color: 'error.main' }} />}
          onClick={() => handleActionClick('Log Out')}
          sx={{
            justifyContent: 'flex-start',
            textTransform: 'none',
            color: 'error.main',
          }}
        >
          Logout
        </Button>

        <Typography variant="body2" sx={{ color: 'grey.500', mt: 2 }}>
          Version 1.0.0 (c) 2024 Wits Solutions
        </Typography>
      </Box>

      <OtherWitsAppsModal open={openModal} onClose={() => setOpenModal(false)} />
    </Box>
  );
};

export default MobileProfilePage;
