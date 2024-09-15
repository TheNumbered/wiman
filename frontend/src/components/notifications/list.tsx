import { useGetQuery } from '@/hooks';
import { Notifications } from '@/interfaces';
import { Divider, Typography } from '@mui/material';
import React from 'react';
import NotificationItem from './item';

const NotificationList: React.FC = () => {
  const {
    data: notificationsData,
    isLoading,
    isError,
  } = useGetQuery<Notifications[]>({
    resource: `api/notifications`,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching notifications</div>;
  }

  const notifications: Notifications[] = notificationsData || [];

  const unseenNotifications = notifications.filter((notifications) => !notifications.isRead);
  const seenNotifications = notifications.filter((notification) => notification.isRead);

  return (
    <div style={{ margin: '20px' }}>
      <Typography variant="h6" style={{ marginBottom: 16 }}>
        Notifications
      </Typography>
      {unseenNotifications.map((notification) => (
        <NotificationItem key={notification.notificationId} notification={notification} />
      ))}

      <Divider style={{ margin: '20px 0' }} />

      <Typography variant="h6" style={{ marginBottom: 16 }}>
        Seen Notifications
      </Typography>
      {seenNotifications.map((notification) => (
        <NotificationItem key={notification.notificationId} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationList;
