// Notifications.tsx
import { useGetQuery } from '@/hooks'; // Import your custom hook
import { List, ListItem, ListItemText, Popover, Typography } from '@mui/material';
import React, { useState } from 'react';

// Define the Alert interface directly in the component
interface Alert {
  venueId: number; // Added venueId
  venueName: string; // Added venueName
  location: string; // Added location
  alertId: number | null; // Changed to allow null
  severity: string | null; // Changed to allow null
  reason: string | null; // Changed to allow null
  description?: string; // Optional property
}

interface NotificationsProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
  open: boolean;
}

const Notifications: React.FC<NotificationsProps> = ({ anchorEl, onClose, open }) => {
  const [isFetched, setIsFetched] = useState(false); // State to track if alerts have been fetched

  // Use the custom hook to fetch alerts
  const {
    data: alerts = [],
    isError,
    isLoading,
  } = useGetQuery<Alert[]>({
    resource: 'api/alerts', // Adjust resource path if necessary
  });

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <div style={{ padding: '10px' }}>
        <Typography variant="h6">Latest Alerts</Typography>
        {isLoading && <Typography>Loading...</Typography>}
        {isError && <Typography color="error">Error fetching alerts</Typography>}
        <List>
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <ListItem key={alert.alertId}>
                <ListItemText
                  primary={`${alert.venueName} - [${alert.severity}] ${alert.reason || 'No reason'}`}
                  secondary={alert.description || 'No description'}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No alerts available" />
            </ListItem>
          )}
        </List>
      </div>
    </Popover>
  );
};

export default Notifications;
