import { Booking } from '@/interfaces';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Card, CardContent, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';

interface BookingCardProps {
  booking: Booking;
  onCancelBooking?: () => void;
  onRebooking?: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onCancelBooking, onRebooking }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getCancellationReason = () => {
    switch (booking.reasonForCancellation) {
      case 'user':
        return 'You cancelled';
      case 'maintenance':
        return 'Maintenance issues';
      case 'safety':
        return 'Safety issues';
      default:
        return '';
    }
  };

  // Determine colors based on status
  const cardBackgroundColor =
    booking.status === 'cancelled'
      ? '#ffebee'
      : booking.status === 'inactive'
        ? '#e0e0e0'
        : '#fff7e8';
  const borderColor =
    booking.status === 'cancelled'
      ? '#ffcccb'
      : booking.status === 'inactive'
        ? '#bdbdbd'
        : '#1565c0'; // Light version for cancelled and inactive
  const dateColor =
    booking.status === 'cancelled' || booking.status === 'inactive' ? '#9e9e9e' : '#1565c0'; // Gray color for past bookings

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {/* Date Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 60,
          px: 1,
          fontWeight: 'bold',
          color: dateColor, // Gray color for past bookings
        }}
      >
        <Typography variant="body2" fontWeight="bold">
          {new Date(booking.date).toLocaleDateString('en-US', { day: '2-digit' })}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {new Date(booking.date).toLocaleDateString('en-US', { month: 'short' })}
        </Typography>
      </Box>

      <Card
        sx={{
          display: 'flex',
          flex: 1,
          mb: 2,
          backgroundColor: cardBackgroundColor,
          opacity: booking.status === 'cancelled' ? 0.7 : 1,
          borderLeft: `5px solid ${borderColor}`, // Light version of card color for the left border
          padding: 0,
          borderRadius: 3,
        }}
      >
        {/* Details Section */}
        <CardContent sx={{ flex: 1, paddingLeft: 2 }}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            {booking.purpose}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            VENUE LOCATION
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {booking.status === 'cancelled' || booking.status === 'inactive'
              ? `${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)} ${getCancellationReason()}`
              : booking.startTime}
          </Typography>
        </CardContent>

        {/* Menu Icon */}
        <IconButton
          sx={{ alignSelf: 'center', paddingRight: 2 }}
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <MoreVertIcon />
        </IconButton>

        {/* Dropdown Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem disabled>
            <Typography variant="body2">
              Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Typography>
          </MenuItem>
          {booking.status === 'cancelled' && booking.reasonForCancellation && (
            <MenuItem disabled>
              <Typography variant="body2">Reason: {getCancellationReason()}</Typography>
            </MenuItem>
          )}
          {booking.status === 'cancelled' && onRebooking && (
            <MenuItem onClick={onRebooking}>
              <Typography variant="body2" color="primary">
                Make New Booking
              </Typography>
            </MenuItem>
          )}
          {booking.status === 'inactive' && onRebooking && (
            <MenuItem onClick={onRebooking}>
              <Typography variant="body2" color="primary">
                Rebook
              </Typography>
            </MenuItem>
          )}
          {booking.status !== 'cancelled' && booking.status !== 'inactive' && onCancelBooking && (
            <MenuItem onClick={onCancelBooking}>
              <Typography variant="body2" color="error">
                Cancel Booking
              </Typography>
            </MenuItem>
          )}
        </Menu>
      </Card>
    </div>
  );
};

export default BookingCard;
