import { Notification } from '@/interfaces';
import { MeetingRoom, NoMeetingRoom } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
import { Chip, IconButton, Typography } from '@mui/material';

const iconMap: { [key: string]: JSX.Element } = {
  maintenance: <InfoIcon sx={{ color: 'error.main' }} />,
  booking: <MeetingRoom sx={{ color: 'secondary.main' }} />,
  cancel: <CancelIcon sx={{ color: 'secondary.main' }} />,
  cancel_booking: <NoMeetingRoom sx={{ color: 'error.main' }} />,
};

interface NotificationItemProps {
  notification: Notification;
}

// Component to display a single notification
const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const Icon = iconMap[notification.code] || <InfoIcon />;
  const isReadStyle = notification.isRead ? { opacity: 0.5 } : {};

  const ActionButton = () => {
    if (notification.code === 'cancel_booking') {
      // have the chip wrap content
      return (
        <Chip
          label="Edit Booking"
          size={'small'}
          variant="outlined"
          sx={{
            marginTop: 1,
            color: 'secondary.main',
            borderColor: 'secondary.main',
            cursor: 'pointer',
            width: 'fit-content',
          }}
        />
      );
    }
    return null;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12, ...isReadStyle }}>
      <IconButton>{Icon}</IconButton>
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 16 }}>
        <Typography variant="body1">{notification.message}</Typography>
        {ActionButton()}
      </div>
    </div>
  );
};

export default NotificationItem;
