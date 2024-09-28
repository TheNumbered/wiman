import ImageUploadButton from '@/components/image-upload-button';
import { useCreateMutation } from '@/hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const MAX_IMAGES = 5;

const IssueReportForm: React.FC = () => {
  const [venueId, setVenueId] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ venueId?: string; description?: string }>({});

  const createIssueMutation = useCreateMutation({
    resource: 'api/maintenance/issue-report',
    contentType: 'empty',
    onSuccessMessage: 'Issue report created successfully!',
    invalidateKeys: ['issue-reports'],
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let hasError = false;

    const validationErrors: { venueId?: string; description?: string } = {};
    if (!venueId) {
      validationErrors.venueId = 'Venue ID is required';
      hasError = true;
    }
    if (!description) {
      validationErrors.description = 'Description is required';
      hasError = true;
    }

    setErrors(validationErrors);

    if (hasError) return;

    const formData = new FormData();
    formData.append('venueId', venueId);
    formData.append('description', description);

    selectedImages.forEach((image) => {
      formData.append('images', image);
    });

    createIssueMutation.mutate(formData);
    setVenueId('');
    setDescription('');
    setSelectedImages([]);
  };

  const handleImageSelect = (files: FileList | null) => {
    if (!files) return;

    const newSelectedImages: File[] = [];

    Array.from(files).forEach((file) => {
      if (
        newSelectedImages.length + selectedImages.length < MAX_IMAGES &&
        !selectedImages.some((img) => img.name === file.name) // Prevent duplicate images
      ) {
        newSelectedImages.push(file);
      }
    });

    setSelectedImages((prev) => [...prev, ...newSelectedImages]);
  };

  // Function to remove an image by index
  const handleRemoveImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
  };

  // Function to clear all selected images
  const handleClearImages = () => {
    setSelectedImages([]);
  };

  const renderImagePreviews = () => {
    const previewSlots = Array(MAX_IMAGES).fill(null);
    selectedImages.forEach((image, index) => {
      previewSlots[index] = image;
    });

    return (
      <Box display="flex" gap={1} mt={2} flexWrap="wrap">
        {previewSlots.map((image, index) => (
          <Box
            key={index}
            position="relative"
            width="100px"
            height="100px"
            border="1px solid #ccc"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="#f5f5f5"
            sx={{ cursor: 'pointer' }}
            onClick={() => handleRemoveImage(index)} // Click to remove
          >
            {image ? (
              <>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Selected ${index + 1}`}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
                <IconButton
                  size="small"
                  sx={{ position: 'absolute', top: 0, right: 0, color: '#ff0000' }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the outer click event
                    handleRemoveImage(index);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            ) : (
              <Typography variant="caption">Empty</Typography>
            )}
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem 1rem 4rem' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6">Report an Issue</Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Venue ID"
            fullWidth
            value={venueId}
            onChange={(e) => setVenueId(e.target.value)}
            error={!!errors.venueId}
            helperText={errors.venueId || ''}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!errors.description}
            helperText={errors.description || ''}
          />
        </Grid>

        <Grid item xs={12}>
          <ImageUploadButton onImageSelect={handleImageSelect} />
          {renderImagePreviews()}
          {selectedImages.length > 0 && (
            <Button onClick={handleClearImages} variant="outlined" color="secondary" sx={{ mt: 2 }}>
              Clear All Images
            </Button>
          )}
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={createIssueMutation.isPending}
          >
            {createIssueMutation.isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default IssueReportForm;
