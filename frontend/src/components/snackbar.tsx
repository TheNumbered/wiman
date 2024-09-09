import Alert from '@mui/material/Alert';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import * as React from 'react';

interface SnackbarProps {
  message: string;
  open: boolean;
  severity: 'success' | 'error' | 'warning' | 'info'; // Add different message types
  onClose: () => void;
}

const AutohideSnackbar: React.FC<SnackbarProps> = ({ message, open, severity, onClose }) => {
  const handleClose = (_event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} variant="filled" severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AutohideSnackbar;
