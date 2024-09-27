import { useUpdateMutation } from '@/hooks';
import { MaintenanceIssue } from '@/interfaces';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

interface MaintenanceIssueDetailsProps {
  issue: MaintenanceIssue | null;
}

const MaintenanceIssueDetails: React.FC<MaintenanceIssueDetailsProps> = ({ issue }) => {
  const [openModal, setOpenModal] = useState(false);
  const [capacity, setCapacity] = useState<number>(0); // Default state
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isUnderMaintenance, setIsUnderMaintenance] = useState<boolean>(false);

  const { mutate: updateVenue } = useUpdateMutation({
    resource: 'api/admin/update-venue',
    onSuccessMessage: 'Venue details updated successfully',
    invalidateKeys: ['api/admin/issues-in-progress'],
  });

  // Make sure the state updates when the `issue` prop changes
  useEffect(() => {
    if (issue) {
      setCapacity(issue.capacity);
      setSelectedAmenities(issue.amenities);
      setIsUnderMaintenance(issue.underMaintenance === 1);
    }
  }, [issue]);

  if (!issue) {
    return <Typography variant="h6">Select an issue to view its details</Typography>;
  }

  const resolutionLogData = issue.resolutionLog ? JSON.parse(issue.resolutionLog) : null;

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleUpdate = () => {
    const updatedVenue = {
      capacity,
      amenities: selectedAmenities,
      underMaintenance: isUnderMaintenance ? 1 : 0,
    };
    updateVenue({ id: issue.venueId, data: updatedVenue });
    handleCloseModal();
  };

  return (
    <>
      <Card sx={{ maxWidth: 600, margin: 'auto' }}>
        {issue.maintenanceImageUrl && (
          <CardMedia
            component="img"
            image={issue.maintenanceImageUrl}
            alt="Maintenance Issue"
            sx={{ height: 200 }}
          />
        )}
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Issue Details
          </Typography>
          <Typography variant="body1">Description: {issue.issueDescription}</Typography>
          <Typography variant="body1">
            Under Maintenance: {issue.underMaintenance ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body1">Amenities:</Typography>
          <Box mb={2}>
            {issue.amenities.map((amenity, index) => (
              <Chip
                key={index}
                label={amenity}
                sx={{ marginRight: 1, marginBottom: 1, cursor: 'pointer' }}
                onClick={() => console.log(`Clicked on ${amenity}`)} // Optional click handler
              />
            ))}
          </Box>
          {resolutionLogData && (
            <Paper elevation={2} sx={{ padding: 2, marginTop: 2 }}>
              <Typography variant="h6">Resolution Log:</Typography>
              <Typography variant="body1">
                <strong>Problem Class:</strong> {resolutionLogData['Problem Class']}
              </Typography>
              <Typography variant="body1">
                <strong>Requirements To Fix:</strong> {resolutionLogData['Requirements To Fix']}
              </Typography>
              <Typography variant="body1">
                <strong>Set Back:</strong> {resolutionLogData['Set Back'] || 'N/A'}
              </Typography>
            </Paper>
          )}
          <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleOpenModal}>
            Update Venue
          </Button>
        </CardContent>
      </Card>

      {/* Update Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            width: 400,
            margin: 'auto',
            padding: 4,
            backgroundColor: 'white',
            marginTop: '15%',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Update Venue Details
          </Typography>

          <TextField
            label="Capacity"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            fullWidth
            sx={{ marginBottom: 2 }}
          />

          <Typography variant="body1">Amenities:</Typography>
          <Select
            multiple
            value={selectedAmenities}
            onChange={(e) => setSelectedAmenities(e.target.value as string[])}
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            {['projector', 'whiteboard', 'AC', 'Wi-Fi'].map((amenity) => (
              <MenuItem key={amenity} value={amenity}>
                {amenity}
              </MenuItem>
            ))}
          </Select>

          <Typography variant="body1">Under Maintenance:</Typography>
          <Select
            value={isUnderMaintenance ? 1 : 0}
            onChange={(e) => setIsUnderMaintenance(e.target.value === 1)}
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={0}>No</MenuItem>
          </Select>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button onClick={handleCloseModal} sx={{ marginRight: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default MaintenanceIssueDetails;
