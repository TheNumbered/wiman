import { Bookings } from '@/interfaces';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
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
  const theme = useTheme(); // Access the current theme (light/dark mode)
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

  // Determine colors based on status and theme mode (dark/light)
  const cardBackgroundColor = isCancelled
    ? theme.palette.mode === 'dark'
      ? '#3c2f2f'
      : '#ffebee'
    : booking.status === 'confirmed'
      ? theme.palette.mode === 'dark'
        ? '#3e3626'
        : '#fff7e8'
      : theme.palette.mode === 'dark'
        ? '#424242'
        : '#e0e0e0';

  const borderColor = isCancelled
    ? theme.palette.mode === 'dark'
      ? '#a77171'
      : '#ffcccb'
    : booking.status === 'confirmed'
      ? theme.palette.mode === 'dark'
        ? '#ffb74d'
        : '#1565c0'
      : theme.palette.mode === 'dark'
        ? '#616161'
        : '#bdbdbd';

  const dateColor = isCancelled
    ? theme.palette.mode === 'dark'
      ? '#aaaaaa'
      : '#9e9e9e'
    : theme.palette.mode === 'dark'
      ? '#ffcc80'
      : '#1565c0';

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
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 3px 6px rgba(0,0,0,0.6)'
              : '0 3px 6px rgba(0,0,0,0.1)',
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
