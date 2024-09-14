import ImageUploadButton from '@/components/image-upload-button';
import AutohideSnackbar from '@/components/snackbar';
import { useGetQuery } from '@/hooks/get-query';
import { useAuth } from '@clerk/clerk-react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';

interface Room {
  id: string;
  name: string;
}

interface Building {
  id: string;
  name: string;
  rooms: Room[];
}

type SnackbarType = 'error' | 'success' | 'info' | 'warning';

const IssueReporting: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<string>('');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackBarType] = useState<SnackbarType>('info');
  const [errors, setErrors] = useState({
    building: '',
    room: '',
    description: '',
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const { getToken } = useAuth(); // Get auth token

  const {
    data: buildings,
    isLoading,
    isError,
    error,
  } = useGetQuery<Building[]>({
    resource: 'api/buildings',
  });

  if (isLoading) {
    return (
      <Box sx={{ width: '100%', padding: '1rem' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ width: '100%', padding: '1rem' }}>
        <Typography color="error">Failed to load issue report: {error.message}</Typography>
      </Box>
    );
  }

  const handleBuildingChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const buildingId = event.target.value as string;
    setSelectedBuilding(buildingId);

    // Ensure buildings is not undefined
    const selectedBuilding = buildings?.find((b) => b.id === buildingId);
    setRooms(selectedBuilding ? selectedBuilding.rooms : []);
    setSelectedRoom(''); // Reset room selection when building changes
    setErrors((prev) => ({ ...prev, building: '' })); // Clear building error
  };

  const handleRoomChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedRoom(event.target.value as string);
    setErrors((prev) => ({ ...prev, room: '' })); // Clear room error
  };

  const handleImageSelect = (file: File | null) => {
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const clearFormEntries = () => {
    setSelectedBuilding('');
    setSelectedRoom('');
    setSelectedImage(null);
    setImagePreview(null);
    if (inputRef.current) {
      inputRef.current.value = ''; // Clear the input value directly
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { building: '', room: '', description: '' };

    if (!selectedBuilding) {
      newErrors.building = 'Please select a building';
      valid = false;
    }

    if (!selectedRoom) {
      newErrors.room = 'Please select a room';
      valid = false;
    }

    if (!inputRef.current?.value.trim()) {
      newErrors.description = 'Description cannot be empty';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // Exit if form is invalid
    }

    const formData = new FormData();
    formData.append('building', selectedBuilding);
    formData.append('room', selectedRoom);
    formData.append('description', inputRef.current?.value || '');

    if (selectedImage) {
      formData.append('image', selectedImage); // Append the image file directly to FormData
    }

    try {
      const token = await getToken(); // Get the auth token

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/issue-report`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // Note: 'Content-Type' is not set for FormData; it's set automatically
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create issue');
      }

      console.log('Issue created:', data);
      clearFormEntries();
      setSnackBarType('success');
      setSnackbarMessage(data.message);
      setOpenSnackbar(true);
    } catch (error) {
      setSnackBarType('error');
      setSnackbarMessage('Failed to submit form');
      setOpenSnackbar(true);
      console.error('Error:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component={'article'}>
      <Typography variant="h4" my={4} gutterBottom>
        Reporting
      </Typography>
      <Box ml={2} component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <TextField
            label="Building"
            name="building"
            select
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedBuilding}
            onChange={handleBuildingChange}
            SelectProps={{
              native: true,
            }}
            error={!!errors.building}
            helperText={errors.building}
          >
            <option value="" disabled></option>
            {buildings && buildings.length > 0 ? (
              buildings.map((building: { id: string; name: string }) => (
                <option key={building.id} value={building.id}>
                  {building.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Could not load buildings
              </option>
            )}
          </TextField>

          <TextField
            label="Room"
            name="room"
            select
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedRoom}
            onChange={handleRoomChange}
            SelectProps={{
              native: true,
            }}
            error={!!errors.room}
            helperText={errors.room}
            disabled={!selectedBuilding}
          >
            <option value="" disabled>
              ""
            </option>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Could not load rooms
              </option>
            )}
          </TextField>

          <TextField
            label="Description"
            variant="outlined"
            name="description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            inputRef={inputRef}
            error={!!errors.description}
            helperText={errors.description}
          />

          <Grid>
            <ImageUploadButton onImageSelect={handleImageSelect} />
            {imagePreview && (
              <Box mt={2}>
                <Typography variant="subtitle1">Selected Image:</Typography>
                <img
                  src={imagePreview}
                  alt="Selected"
                  style={{ maxWidth: '100%', height: 'auto', width: '40rem' }}
                />
              </Box>
            )}
          </Grid>

          <Grid item xs={12} mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>

      <AutohideSnackbar
        message={snackbarMessage}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        severity={snackbarType}
      />
    </Container>
  );
};

export default IssueReporting;
