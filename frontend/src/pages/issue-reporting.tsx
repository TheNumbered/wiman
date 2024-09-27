import ImageUploadButton from '@/components/image-upload-button';
import { useCreateMutation } from '@/hooks';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const IssueReportForm: React.FC = () => {
  const [venueId, setVenueId] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
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

    // Simple form validation
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

    if (selectedImage) {
      formData.append('image', selectedImage);
    }
    // formData.forEach((element) => {
    //   console.log(element);
    // });
    createIssueMutation.mutate(formData);
    // Optionally reset the form after submission
    // setVenueId('');
    // setDescription('');
    // setSelectedImage(null);
    // setImagePreview(null);
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

  return (
    <form onSubmit={handleSubmit}>
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
