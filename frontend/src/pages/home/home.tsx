import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Grid, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Searchings from './searching';

const HomePage: React.FC = () => {
  const campuses = [
    { title: 'Braamfontein', subtitle: 'East Campus' },
    { title: 'Braamfontein', subtitle: 'West Campus' },
    { title: 'Parktown', subtitle: 'Education Campus' },
    { title: 'Parktown', subtitle: 'Health Science Campus' },
  ];

  const navigate = useNavigate(); // Initialize navigate for navigation

  const handlePaperClick = (campus: string, subtitle: string) => {
    navigate('/searchings', { state: { searchTerm: `${campus}, ${subtitle}` } });
  };

  const handleSearchClick = () => {
    navigate('/searchings');
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ padding: 3 }}>
      {isMobile ? (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              marginBottom: 3,
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <img src="/LOGO.png" alt="Logo" style={{ width: '350px', height: 'auto' }} />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
            {/* Book a Venue Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#0056A2', // Match the blue background in the image
                color: '#fff', // White text
                borderRadius: '30px', // Rounded corners
                padding: '10px 20px',
                minWidth: '150px',
                maxWidth: '150px', // Set to equal width
                flexGrow: 1,
                '&:hover': {
                  backgroundColor: '#003f7d', // Darken the blue slightly on hover
                },
              }}
            >
              Book a Venue
            </Button>

            {/* Search Button */}
            <Button
              variant="outlined"
              sx={{
                backgroundColor: '#f0f4ff', // Light blue background for the search button
                color: '#0056A2', // Blue text for the search button
                borderRadius: '30px', // Rounded corners
                padding: '10px 20px',
                minWidth: '150px',
                maxWidth: '150px', // Set to equal width
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: '#e0e9ff', // Slight hover effect
                },
              }}
              onClick={handleSearchClick} // Navigate on click
            >
              <SearchIcon sx={{ marginRight: 1 }} />
              Search
            </Button>
          </Box>

          <Typography variant="h5" gutterBottom>
            Explore By Campus
          </Typography>

          <Grid container spacing={2}>
            {campuses.map((campus, index) => (
              <Grid item xs={6} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 3,
                    textAlign: 'center',
                    width: '100%',
                    backgroundColor: theme.palette.secondary.main,
                    cursor: 'pointer',
                    minHeight: '150px',
                  }}
                  onClick={() => handlePaperClick(campus.title, campus.subtitle)} // Pass both title and subtitle
                >
                  <Typography variant="body1">{campus.title}</Typography>
                  <Typography variant="caption">{campus.subtitle}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Searchings />
      )}
    </Box>
  );
};

export default HomePage;
