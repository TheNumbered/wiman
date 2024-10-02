import { useGetQuery } from '@/hooks';
import { Notifications as NotificationsInterface } from '@/interfaces';
import { Divider, List, ListItem, ListItemText, Popover, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NotificationItem from '../activities/item';

interface Report {
  reportID: number;
  description: string;
  location: string;
  urgencyLevel: string;
  status: string;
}

interface NotificationsProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
  open: boolean;
}

const Notifications: React.FC<NotificationsProps> = ({ anchorEl, onClose, open }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const { data: notificationsData } = useGetQuery<NotificationsInterface[]>({
    resource: `api/notifications`,
  });

  const notifications: NotificationsInterface[] = notificationsData || [];

  const unseenNotifications = notifications.filter((notifications) => !notifications.isRead);
  const seenNotifications = notifications.filter((notification) => notification.isRead);

  useEffect(() => {
    fetch('https://sdp-campus-safety.azurewebsites.net/reports')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setReports(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching reports:', error);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <div style={{ padding: '10px' }}>
        <Typography variant="h6">Latest Reports</Typography>
        {isLoading && <Typography>Loading...</Typography>}
        {isError && <Typography color="error">Error fetching reports</Typography>}
        <List>
          {reports.length > 0 ? (
            reports.map((report) => (
              <ListItem key={report.reportID}>
                <ListItemText
                  primary={`${report.location} - [${report.urgencyLevel}] ${report.status}`}
                  secondary={report.description}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No reports available" />
            </ListItem>
          )}
        </List>

        <Typography variant="h6">Notifications</Typography>
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
    </Popover>
  );
};

export default Notifications;
