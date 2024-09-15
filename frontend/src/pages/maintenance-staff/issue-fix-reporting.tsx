import AutohideSnackbar from '@/components/snackbar';
import { useUpdateMutation } from '@/hooks';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

interface IssueFixReportingProps {
  issue_id: string;
}

type SnackbarType = 'error' | 'success' | 'info' | 'warning';

const IssueFixReporting: React.FC<IssueFixReportingProps> = ({ issue_id }) => {
  const [selectedIssueState, setIssueState] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackBarType] = useState<SnackbarType>('info');
  const [errors, setErrors] = useState<{ issueState?: string; description?: string }>({});
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateIssueMutation = useUpdateMutation({
    resource: 'api/review-issue-report',
    contentType: 'application/json',
  });

  const clearFormEntries = () => {
    if (inputRef.current) {
      inputRef.current.value = ''; // Clear the input value directly
    }
    setIssueState(''); // Clear the issue state
    setDescription(''); // Clear the description state
    setErrors({}); // Clear validation errors
  };

  const validateForm = () => {
    const newErrors: { issueState?: string; description?: string } = {};
    if (!selectedIssueState) {
      newErrors.issueState = 'Issue state is required.';
    }
    if (!description) {
      newErrors.description = 'Description is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // If validation fails, do not proceed
    }

    const formData = new FormData(event.currentTarget);

    const data = {
      issue_state: selectedIssueState,
      review: formData.get('description') as string,
    };

    updateIssueMutation.mutate(
      { id: issue_id, data },
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
          setSnackBarType('error');
          setSnackbarMessage('Failed to update the issue.');
          setOpenSnackbar(true);
        },
      },
    );
  };

  const handleIssueStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIssueState(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setDescription(event.target.value);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: { xs: 2 } }} gutterBottom>
        Review Report
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
              label="Issue State"
              name="issueState"
              select
              variant="outlined"
              fullWidth
              margin="normal"
              value={selectedIssueState}
              onChange={handleIssueStateChange}
              SelectProps={{
                native: true,
              }}
              error={!!errors.issueState}
              helperText={errors.issueState}
            >
              <option value=""></option>
              <option value="False Report">False Report</option>
              <option value="Major Issue">Major Issue</option>
              <option value="Minor Issue">Minor Issue</option>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Requirements to fix"
              variant="outlined"
              name="description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              inputRef={inputRef}
              value={description}
              onChange={handleDescriptionChange}
              error={!!errors.description}
              helperText={errors.description}
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

export default IssueFixReporting;
