import { useUser } from '@clerk/clerk-react';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeMobile: FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleBookVenue = () => {
    navigate('/venue/booking');
  };

  const handleSearch = (searchTerm: string) => {
    navigate('/mobile/search', { state: { searchTerm } });
  };

  const campuses = [
    { campus: 'Braamfontein', subCampus: 'East Campus' },
    { campus: 'Braamfontein', subCampus: 'West Campus' },
    { campus: 'Parktown', subCampus: 'Education Campus' },
    { campus: 'Parktown', subCampus: 'Health Science Campus' },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={4}
      sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mb={4}>
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          Welcome, {user?.firstName}
        </Typography>
        <Avatar
          alt="user-icon"
          src={user?.imageUrl ?? 'https://openui.fly.dev/openui/24x24.svg?text=👤'}
          sx={{
            width: 40,
            height: 40,
            border: '2px solid',
            borderColor: 'secondary.main',
          }}
        />
      </Box>

      <Box display="flex" justifyContent="center" width="100%" mb={4}>
        <img src="/LOGO.png" alt="Logo" style={{ width: '280px', height: 'auto' }} />
      </Box>

      <Box display="flex" gap={4} mb={4} sx={{ width: '100%', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBookVenue}
          sx={{
            borderRadius: '30px',
            padding: '10px 20px',
            minWidth: '150px',
            maxWidth: '150px',
            flexGrow: 1,
          }}
        >
          Book Venue
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleSearch('')}
          sx={{
            borderRadius: '30px',
            padding: '10px 20px',
            minWidth: '150px',
            maxWidth: '150px',
            flexGrow: 1,
          }}
        >
          Search
        </Button>
      </Box>

      <Typography variant="h5" fontWeight="bold" color="text.primary" mb={2}>
        Explore By Campus
      </Typography>

      <Grid container spacing={1} width="100%">
        {campuses.map((item, index) => (
          <Grid item xs={6} key={index} onClick={() => handleSearch(item.subCampus)}>
            <Box
              p={3}
              borderRadius={4}
              height={180}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignContent={'center'}
              textAlign={'center'}
              sx={{
                backgroundColor: '#FFE8CB',
                cursor: 'pointer',
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="text.secondary">
                {item.campus}
              </Typography>
              <Typography color="text.primary">{item.subCampus}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomeMobile;
