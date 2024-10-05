import { useCreateMutation } from '@/hooks';
import { Info, UploadFile } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface UploadCsvModalProps {
  open: boolean;
  handleClose: () => void;
}

const UploadCsvModal: React.FC<UploadCsvModalProps> = ({ open, handleClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
      setFileError(null); // Clear previous error if a valid file is selected
    } else {
      setFileError('Please upload a valid CSV file');
      setSelectedFile(null);
    }
  };

  const { mutate: uploadSchedule } = useCreateMutation({
    resource: 'api/admin/bookings/schedule',
    contentType: 'empty',
    onSuccessMessage: 'Schedule uploaded successfully',
    invalidateKeys: ['api/admin/bookings'],
  });

  // Handle file upload
  const handleUpload = () => {
    if (selectedFile) {
      handleClose(); // Close the modal after upload
      // create a new FormData object
      const formData = new FormData();
      // append the file to the formData
      formData.append('file', selectedFile);
      // call the uploadSchedule mutation
      uploadSchedule(formData);
    } else {
      setFileError('No file selected or invalid file format');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="upload-csv-modal-title"
      aria-describedby="upload-csv-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: 500,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="upload-csv-modal-title"
          variant="h5"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            textAlign: 'center',
            color: 'primary.main',
          }}
        >
          Upload CSV File
        </Typography>
        <Typography
          id="upload-csv-modal-description"
          sx={{ textAlign: 'center', mb: 3, color: 'text.secondary' }}
        >
          Please upload a CSV file containing the required fields.
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon>
              <Info color="primary" />
            </ListItemIcon>
            <ListItemText primary="Date: (YYYY-MM-DD)" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Info color="primary" />
            </ListItemIcon>
            <ListItemText primary="Start Time: (HH:MM, 24-hour format)" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Info color="primary" />
            </ListItemIcon>
            <ListItemText primary="End Time: (HH:MM, 24-hour format)" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Info color="primary" />
            </ListItemIcon>
            <ListItemText primary="Venue ID: (Unique identifier for the venue)" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Info color="primary" />
            </ListItemIcon>
            <ListItemText primary="Event Name: (Name of the event)" />
          </ListItem>
        </List>

        {fileError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {fileError}
          </Alert>
        )}

        <TextField
          type="file"
          fullWidth
          inputProps={{ accept: '.csv' }}
          onChange={handleFileChange}
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<UploadFile />}
          onClick={handleUpload}
          disabled={!selectedFile}
          sx={{
            py: 1.5,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          Upload CSV
        </Button>
      </Box>
    </Modal>
  );
};

export default UploadCsvModal;
