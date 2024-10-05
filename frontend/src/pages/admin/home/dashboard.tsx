import { useUser } from '@clerk/clerk-react';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Notifications from '../notifications';

const DashboardCards: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user } = useUser();
  const navigate = useNavigate();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleUsers = () => {
    navigate('/admin/manage-users');
  };

  const handleIssues = () => {
    navigate('/admin/issues');
  };

  const handleBookings = () => {
    navigate('/admin/manage-bookings');
  };

  const handleSchedule = () => {
    navigate('');
  };

  const homeCards = [
    { card: 'Users', subCard: 'Manage Users', onClick: handleUsers },
    { card: 'Bookings', subCard: 'Manage Bookings', onClick: handleBookings },
    { card: 'Venue Issues', subCard: 'Advanced Issues', onClick: handleIssues },
    { card: 'Academic Schedule', subCard: 'Upload here', onClick: handleSchedule },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <IconButton
        onClick={handleClick}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1,
          backgroundColor: '#f5f5f5',
        }}
        color="primary"
      >
        <NotificationsIcon />
      </IconButton>
      <Notifications anchorEl={anchorEl} onClose={handleClose} open={open} />

      {isMobile ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={2}
          sx={{ minHeight: '100vh', overflowY: 'none' }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            mb={4}
          >
            <Typography variant="h6" color="text.primary">
              Welcome, {user?.firstName}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center" width="100%" mb={4}>
            <img
              src={theme.palette.mode === 'dark' ? '/logo_1000w_dark.png' : '/logo_1000w.png'}
              alt="Logo"
              style={{ width: '280px', height: 'auto' }}
            />
          </Box>

          <Typography variant="h6" color="text.primary" mb={2}>
            Recommendations
          </Typography>

          <Grid container spacing={1} width="100%">
            {homeCards.map((item, index) => (
              <Grid item xs={6} key={index}>
                <Box
                  p={3}
                  borderRadius={4}
                  height={180}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignContent="center"
                  textAlign="center"
                  sx={{
                    backgroundColor: 'secondary.light',
                    cursor: 'pointer',
                  }}
                  onClick={item.onClick}
                >
                  <Typography variant="h6" fontWeight="bold" color="text.primary">
                    {item.card}
                  </Typography>
                  <Typography color="text.primary">{item.subCard}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
            padding: '2rem',
            overflow: 'auto',
          }}
        >
          <Box mb={3}>
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              Welcome, {user?.firstName}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center" width="100%" mb={4}>
            <img
              src={theme.palette.mode === 'dark' ? '/logo_1000w_dark.png' : '/logo_1000w.png'}
              alt="Logo"
              style={{ width: '280px', height: 'auto' }}
            />
          </Box>

          <Typography variant="h5" fontWeight="bold" color="text.primary" mb={2}>
            Recommendations
          </Typography>

          <Grid container spacing={3}>
            {homeCards.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
                    border:
                      item.card === 'Users' ||
                      item.card === 'Bookings' ||
                      item.card === 'Venue Issues' ||
                      item.card === 'Academic Schedule'
                        ? '0.5px solid orange'
                        : 'none',
                  }}
                  onClick={item.onClick}
                >
                  {item.card === 'Users' ? (
                    <CardContent
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '150px',
                      }}
                    >
                      <PeopleOutlineIcon
                        sx={{ fontSize: '120px', color: 'gray' }} // Set color to black
                      />
                    </CardContent>
                  ) : item.card === 'Bookings' ? (
                    <CardContent
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '150px',
                      }}
                    >
                      <EventNoteOutlinedIcon
                        sx={{ fontSize: '120px', color: 'gray' }} // Set color to black
                      />
                    </CardContent>
                  ) : item.card === 'Venue Issues' ? (
                    <CardContent
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '150px',
                      }}
                    >
                      <AssessmentOutlinedIcon
                        sx={{ fontSize: '120px', color: 'gray' }} // Set color to black
                      />
                    </CardContent>
                  ) : (
                    <CardContent
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '150px',
                      }}
                    >
                      <FileUploadOutlinedIcon
                        sx={{ fontSize: '120px', color: 'gray' }} // Set color to black
                      />
                    </CardContent>
                  )}
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {item.card}
                    </Typography>
                    <Typography>{item.subCard}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default DashboardCards;
