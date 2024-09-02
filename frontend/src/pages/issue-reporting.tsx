import ImageUploadButton from '@/components/image-upload-button';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const IssueReporting = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Collect form data
    const formData = new FormData(event.currentTarget);
    // Append the selected image to form data
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    // Handle the form submission, e.g., send data to an API
    const formEntries = Object.fromEntries(formData.entries());
    console.log('Form entries:', formEntries);
  };

  return (
    <Container>
      <Typography variant="h4" my={4} gutterBottom>
        Reporting
      </Typography>
      <Box ml={2} component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <TextField
            label="Venue"
            name="venue"
            select
            variant="outlined"
            fullWidth
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </TextField>
          <TextField
            label="Room"
            name="room"
            select
            variant="outlined"
            fullWidth
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </TextField>
          <TextField
            label="Description"
            variant="outlined"
            name="description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
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
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default IssueReporting;
