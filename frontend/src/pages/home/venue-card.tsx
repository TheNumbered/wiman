import { Venue } from '@/interfaces';
import { CalendarToday, Person } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React from 'react';

const VenueCard: React.FC<Venue> = ({ name, campus, capacity, pictures }) => {
  const isAvailable = Math.random() < 0.5 ? 'Available' : 'Unavailable';

  const isMobile = useMediaQuery('(max-width:600px)');

  if (isMobile) {
    return (
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: '#ffffff',
          padding: 1.5,
          borderRadius: 3,
          cursor: isAvailable ? 'pointer' : 'not-allowed',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: isAvailable ? 'scale(1.02)' : 'none',
          },
        }}
      >
        {isAvailable ? (
          <Box
            component="a"
            href="/bookings"
            sx={{ textDecoration: 'none', display: 'flex', width: '100%' }}
          >
            <Box
              component="img"
              src={pictures[0]}
              alt={name}
              sx={{
                width: '60px',
                height: '60px',
                borderRadius: '20%',
                objectFit: 'cover',
                marginRight: '10px',
              }}
            />
            <CardContent sx={{ flex: 1, padding: 0 }}>
              <Typography variant="h6" fontWeight="bold" color="primary" sx={{ fontSize: '13px' }}>
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: '11px' }}>
                {campus}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '3px' }}>
                <Person fontSize="small" sx={{ marginRight: '3px' }} />
                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '11px' }}>
                  {capacity}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '3px' }}>
                <CalendarToday fontSize="small" sx={{ marginRight: '3px' }} />{' '}
                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '11px' }}>
                  {isAvailable}
                </Typography>
              </Box>
            </CardContent>
          </Box>
        ) : (
          <>
            <Box
              component="img"
              src={pictures[0]}
              alt={name}
              sx={{
                width: '60px',
                height: '60px',
                borderRadius: '20%',
                objectFit: 'cover',
                marginRight: '10px',
              }}
            />
            <CardContent sx={{ flex: 1, padding: 0 }}>
              <Typography variant="h6" fontWeight="bold" color="primary" sx={{ fontSize: '13px' }}>
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: '11px' }}>
                {campus}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '3px' }}>
                <Person fontSize="small" sx={{ marginRight: '3px' }} />
                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '11px' }}>
                  {capacity}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '3px' }}>
                <CalendarToday fontSize="small" sx={{ marginRight: '3px' }} /> {/* Calendar icon */}
                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '11px' }}>
                  {isAvailable}
                </Typography>
              </Box>
            </CardContent>
          </>
        )}
      </Card>
    );
  }

  return (
    <Card
      sx={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '15px',
        overflow: 'hidden',
        position: 'relative',
        textAlign: 'left',
        width: '300px',
        margin: '20px',
      }}
    >
      <Box
        component="img"
        height="180"
        src={pictures[0]}
        alt={name}
        sx={{
          borderRadius: '15px',
          objectFit: 'cover',
          width: '100%',
        }}
      />
      <CardContent
        sx={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textAlign: 'left',
        }}
      >
        <Typography variant="body1" component="div" sx={{ fontSize: '18px', fontWeight: 'bold' }}>
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ fontSize: '14px', marginBottom: '8px' }}
        >
          {campus}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '4px', fontSize: '12px' }}>
          <Person fontSize="small" sx={{ marginRight: '4px' }} />
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: '12px' }}>
            {capacity}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
            <CalendarToday fontSize="small" sx={{ marginRight: '4px' }} />
            <Typography variant="body2" color="textSecondary" sx={{ fontSize: '12px' }}>
              Currently {isAvailable}
            </Typography>
          </Box>
          <CardActions sx={{ padding: 0 }}>
            <Button
              disabled={!isAvailable}
              sx={{
                borderRadius: '30px',
                padding: '10px 20px',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '16px',
                backgroundColor: isAvailable ? '#ff9800' : '#e0e0e0',
                color: '#fff',
                '&:hover': {
                  backgroundColor: isAvailable ? '#f57c00' : '#c0c0c0',
                },
              }}
            >
              {isAvailable ? 'Book' : 'Unavailable'}
            </Button>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VenueCard;
