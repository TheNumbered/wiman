import AutohideSnackbar from '@/components/snackbar';
import { useUpdateMutation } from '@/hooks';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

interface IssueFixReportingProps {
  issueId: number;
}

type SnackbarType = 'error' | 'success' | 'info' | 'warning';

const IssueSetBackReporting: React.FC<IssueFixReportingProps> = ({ issueId }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackBarType] = useState<SnackbarType>('info');
  const [description, setDescription] = useState<string>('');
  const [fixRequirements, setFixRequirements] = useState<string>('');
  const [errors, setErrors] = useState<{ description?: string; fixRequirements?: string }>({});

  const updateIssueMutation = useUpdateMutation({
    resource: 'api/maintenance/issue-report',
    invalidateKeys: ['api/maintenance/issue-reports', `api/maintenance/issue-reports/${issueId}`],
  });

  const clearFormEntries = () => {
    setDescription('');
    setFixRequirements('');
    setErrors({}); // Clear validation errors
  };

  const validateForm = () => {
    const newErrors: { description?: string; fixRequirements?: string } = {};
    if (!description) {
      newErrors.description = 'Set Back Description is required.';
    }
    if (!fixRequirements) {
      newErrors.fixRequirements = 'Requirements to fix is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // If validation fails, do not proceed
    }

    const data = {
      setback: description,
      newFixRequirements: fixRequirements,
    };

    updateIssueMutation.mutate(
      { id: issueId + '/add-setback', data },
      {
        onSuccess: (responseData) => {
          console.log('Issue updated:', responseData);
          clearFormEntries();
          setSnackbarMessage(responseData.message || 'Issue updated successfully.');
          setSnackBarType('success');
          setOpenSnackbar(true);
        },
        onError: (error) => {
          console.error('Error updating issue:', error);
          setSnackbarMessage('Failed to update the issue.');
          setSnackBarType('error');
          setOpenSnackbar(true);
        },
      },
    );
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleFixRequirementsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFixRequirements(event.target.value);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: { xs: 2 } }} gutterBottom>
        Set Back Report
      </Typography>
      <Box
        sx={{ ml: { md: 2 } }}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Set Back Description"
              variant="outlined"
              name="description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={description}
              onChange={handleDescriptionChange}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Requirements to fix"
              variant="outlined"
              name="fix-requirements"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={fixRequirements}
              onChange={handleFixRequirementsChange}
              error={!!errors.fixRequirements}
              helperText={errors.fixRequirements}
            />
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

export default IssueSetBackReporting;
