import { useUpdateMutation } from '@/hooks';
import { Notifications } from '@/interfaces';
import { Groups3, MeetingRoom, NoMeetingRoom } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import { IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NotificationItemProps {
  notification: Notifications;
}

// Component to display a single notification
const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  let Icon = <InfoIcon />;

  if (notification.route?.includes('maintenance')) {
    Icon = <InfoIcon sx={{ color: 'error.main' }} />;
  }
  if (notification.route?.includes('booking') && notification.message?.includes('booking')) {
    Icon = <MeetingRoom sx={{ color: 'secondary.main' }} />;
  }
  if (notification.message?.includes('cancelled') && notification.route?.includes('booking')) {
    Icon = <NoMeetingRoom sx={{ color: 'error.main' }} />;
  }
  if (notification.message?.includes('role')) {
    Icon = <Groups3 sx={{ color: 'primary.main' }} />;
  }

  const isReadStyle = notification.isRead ? { opacity: 0.5 } : {};

  const { mutate: markAsRead } = useUpdateMutation({
    resource: `api/notifications`,
  });
  const navigate = useNavigate();
  const handleClick = (notification: Notifications) => {
    if (!notification.isRead) {
      markAsRead({ id: notification.notificationId + '/read', data: {} });
    }
    if (notification.route) {
      navigate(notification.route);
    }
  };

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', marginBottom: 12, ...isReadStyle }}
      onClick={() => handleClick(notification)}
    >
      <IconButton>{Icon}</IconButton>
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 16 }}>
        <Typography variant="body1">{notification.message}</Typography>
      </div>
    </div>
  );
};

export default NotificationItem;
