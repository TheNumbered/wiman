import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import * as React from 'react';

interface SnackbarProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

const AutohideSnackbar: React.FC<SnackbarProps> = ({ message, open, onClose }) => {
  const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  return <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} message={message} />;
};

export default AutohideSnackbar;
