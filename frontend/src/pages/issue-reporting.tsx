import ImageUploadButton from '@/components/image-upload-button';
import AutohideSnackbar from '@/components/snackbar';
// import { useCreateMutation } from '@/hooks/create-mutation'; // Adjust the import path accordinglys
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Room {
  id: string;
  name: string;
}

interface Building {
  id: string;
  name: string;
  rooms: Room[];
}

const IssueReporting: React.FC = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<string>('');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Define the mutation hook

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/buildings`)
      .then((response) => response.json())
      .then((data: Building[]) => setBuildings(data))
      .catch((error) => console.error('Error fetching buildings:', error));
  }, []);

  const handleBuildingChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const buildingId = event.target.value as string;
    setSelectedBuilding(buildingId);

    const selectedBuilding = buildings.find((b) => b.id === buildingId);
    setRooms(selectedBuilding ? selectedBuilding.rooms : []);
    setSelectedRoom(''); // Reset room selection when building changes
  };

  const handleRoomChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedRoom(event.target.value as string);
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
    setOpenSnackbar(true);
    if (inputRef.current) {
      inputRef.current.value = ''; // Clear the input value directly
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('building', selectedBuilding);
    formData.append('room', selectedRoom);
    formData.append('description', event.currentTarget.description.value);

    if (selectedImage) {
      formData.append('image', selectedImage); // Append the image file directly to FormData
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/issue-report`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Issue created:', data);
        // Handle success
        clearFormEntries();
        setSnackbarMessage(data.message);
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <Container>
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
          >
            <option value="" disabled></option>
            {buildings.map((building) => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
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
            disabled={!selectedBuilding}
          >
            <option value="" disabled></option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
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
        severity={'success'}
      />
    </Container>
  );
};

export default IssueReporting;
