// OtherWitsAppsModal.tsx
import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';

interface OtherWitsAppsModalProps {
  open: boolean;
  onClose: () => void;
}

const OtherWitsAppsModal: React.FC<OtherWitsAppsModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="other-wits-apps-title"
      aria-describedby="other-wits-apps-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%', // Adjusted width to fit mobile screen better
          maxWidth: '400px', // Added a max width
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="other-wits-apps-title" variant="h6" component="h2">
          Other Wits Apps
        </Typography>
        <Box sx={{ mt: 2 }}>
          <ul>
            <li>
              <a href="#" onClick={onClose}>
                App1
              </a>
            </li>
            <li>
              <a href="#" onClick={onClose}>
                App2
              </a>
            </li>
            <li>
              <a href="#" onClick={onClose}>
                App3
              </a>
            </li>
            <li>
              <a href="#" onClick={onClose}>
                App4
              </a>
            </li>
          </ul>
        </Box>
        <Button onClick={onClose} sx={{ mt: 3 }} variant="contained">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default OtherWitsAppsModal;
