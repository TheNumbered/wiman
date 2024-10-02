import ErrorComponent from '@/components/error-component';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { useGetQuery } from '@/hooks';
import { Notifications } from '@/interfaces';
import { Divider, Paper, Typography } from '@mui/material';
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
    return <LoadingIndicator></LoadingIndicator>;
  }

  if (isError) {
    return (
      <ErrorComponent
        errorMessage="No notifications found"
        onRetry={() => location.reload()}
      ></ErrorComponent>
    );
  }

  const notifications: Notifications[] = notificationsData || [];

  const unseenNotifications = notifications.filter((notifications) => !notifications.isRead);
  const seenNotifications = notifications.filter((notification) => notification.isRead);

  return (
    <Paper style={{ margin: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: 20 }}>
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
    </Paper>
  );
};

export default NotificationList;
