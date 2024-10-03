import { useUpdateMutation } from '@/hooks';
import { AdvancedIssue } from '@/interfaces';
import {
  Box,
  Button,
  CardContent,
  Container,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CancelVenueBookingsModal from './cancel-venue-bookings';

interface IssueDetailsProps {
  issue: AdvancedIssue | null;
}

const IssueDetails: React.FC<IssueDetailsProps> = ({ issue }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openCancelBookingModal, setOpenCancelBookingModal] = useState(false);
  const [capacity, setCapacity] = useState<number>(0); // Default state
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isUnderMaintenance, setIsUnderMaintenance] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Track selected image

  const { mutate: updateVenue } = useUpdateMutation({
    resource: 'api/admin/update-venue',
    onSuccessMessage: 'Venue details updated successfully',
    invalidateKeys: ['api/admin/issues-in-progress'],
  });

  // Make sure the state updates when the `issue` prop changes
  useEffect(() => {
    if (issue) {
      setCapacity(issue.capacity);
      const amenitiesArray =
        typeof issue.amenities === 'string' ? JSON.parse(issue.amenities) : issue.amenities;
      setSelectedAmenities(amenitiesArray);
      setIsUnderMaintenance(issue.underMaintenance === 1);
      setSelectedImage(null);
    }
  }, [issue]);

  if (!issue) {
    return (
      <Box sx={{ flex: '1' }}>
        <Box
          sx={{
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img style={{ width: '15rem' }} src="/illustration.svg" alt="illustration" />
          <h2 style={{ marginBottom: '0' }}>No report is selected yet</h2>
          <p style={{ color: '#777', margin: '0' }}>
            Choose a report on the left menu to view its details
          </p>
        </Box>
      </Box>
    );
  }

  // Parse maintenanceImageUrl if it's a JSON array
  let images: string[] = [];
  try {
    if (issue.issueImages) {
      images = JSON.parse(issue.issueImages) || [];
    }
  } catch (error) {
    console.error('Failed to parse image URLs:', error);
    images = [issue.issueImages];
  }

  if (selectedImage === null) {
    setSelectedImage(images.length > 0 ? images[0] : 'https://via.placeholder.com/400');
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
      <Container sx={{ maxWidth: 600, margin: 'auto', p: { xs: 0, md: 2 } }}>
        {issue.issueImages && (
          <>
            <Box sx={{ textAlign: 'center' }}>
              <img
                src={selectedImage || images[0]} // Show selected image or first image by default
                alt="Maintenance Issue"
                style={{ width: '100%', borderRadius: '1rem', marginBottom: '1rem' }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
              }}
            >
              {images.length > 1 &&
                images.map((imgUrl: string, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      border:
                        selectedImage === imgUrl ? '2px solid #003b5c' : '2px solid transparent',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      padding: '0.2rem',
                      '&:hover': { border: '2px solid #003b5c' }, // Highlight on hover
                    }}
                    onClick={() => setSelectedImage(imgUrl)}
                  >
                    <img
                      src={imgUrl}
                      alt={`thumbnail-${index}`}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '0.5rem',
                      }}
                    />
                  </Box>
                ))}
            </Box>
          </>
        )}
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Issue Details
          </Typography>
          <Typography variant="body1">Description: {issue.issueDescription}</Typography>
          {issue.venueId !== 'N/A' && (
            <Typography variant="body1">
              Venue Under Maintenance: {issue.underMaintenance ? 'Yes' : 'No'}
            </Typography>
          )}
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
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
            {issue.venueId !== 'N/A' && (
              <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleOpenModal}>
                Update Venue
              </Button>
            )}
            {issue.venueId !== 'N/A' && (
              <Button
                variant="contained"
                color="error"
                sx={{ marginTop: 2 }}
                onClick={() => setOpenCancelBookingModal(true)}
              >
                Cancel Bookings
              </Button>
            )}
          </div>
        </CardContent>
      </Container>

      {/* Update Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            width: 340,
            margin: 'auto',
            padding: 4,
            backgroundColor: 'background.paper',
            marginTop: '15%',
            borderRadius: '1rem',
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
      {openCancelBookingModal && (
        <CancelVenueBookingsModal
          onClose={() => setOpenCancelBookingModal(false)}
          venueId={issue.venueId}
        />
      )}
    </>
  );
};

export default IssueDetails;
