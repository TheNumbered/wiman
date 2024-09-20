import { Bookings } from '@/interfaces';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Card, CardContent, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';

interface BookingCardProps {
  booking: Bookings;
  onCancelBooking?: () => void;
  onRebooking?: () => void;
  onSelectCard?: (booking: Bookings) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onCancelBooking,
  onRebooking,
  onSelectCard,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isPastDate = new Date(booking.date) < new Date();
  const isCancelled =
    booking.status === 'cancelled' || (booking.status === 'pending' && isPastDate);

  const status =
    booking.status === 'pending' && isPastDate ? 'Not Confirmed In Time' : booking.status;

  // Determine colors based on status
  const cardBackgroundColor = isCancelled
    ? '#ffebee'
    : booking.status === 'confirmed'
      ? '#fff7e8'
      : '#e0e0e0';
  const borderColor = isCancelled
    ? '#ffcccb'
    : booking.status === 'confirmed'
      ? '#1565c0'
      : '#bdbdbd';
  const dateColor = isCancelled ? '#9e9e9e' : '#1565c0';

  return (
    <div
      style={{ display: 'flex', width: '100%' }}
      onClick={() => onSelectCard && onSelectCard(booking)}
    >
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
          color: dateColor,
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
          opacity: booking.status == 'pending' ? 0.7 : 1,
          borderLeft: `5px solid ${borderColor}`, // Light version of card color for the left border
          padding: 0,
          borderRadius: 3,
        }}
      >
        {/* Details Section */}
        <CardContent sx={{ flex: 1, paddingLeft: 2 }}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            {booking.eventName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {booking.venueId}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {booking.status === 'cancelled'
              ? `${status.charAt(0).toUpperCase() + status.slice(1)} : ${booking.reasonForCancellation ?? 'No reason provided'}`
              : booking.status == 'pending' && isPastDate
                ? `${status.charAt(0).toUpperCase() + status.slice(1)}`
                : `${booking.startTime.slice(0, 5)} - ${booking.endTime.slice(0, 5)}`}
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
          {booking.status === 'cancelled' && onRebooking && (
            <MenuItem onClick={onRebooking}>
              <Typography variant="body2" color="primary">
                Make New Booking
              </Typography>
            </MenuItem>
          )}
          {booking.status == 'pending' && isPastDate && onRebooking && (
            <MenuItem onClick={onRebooking}>
              <Typography variant="body2" color="primary">
                Rebook
              </Typography>
            </MenuItem>
          )}
          {booking.status !== 'cancelled' &&
            !(booking.status == 'pending' && isPastDate) &&
            onCancelBooking && (
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
