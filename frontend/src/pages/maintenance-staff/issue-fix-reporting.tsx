import AutohideSnackbar from '@/components/snackbar';
import { useUpdateMutation } from '@/hooks';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

interface IssueFixReportingProps {
  issue_id: string;
}

const IssueFixReporting: React.FC<IssueFixReportingProps> = ({ issue_id }) => {
  const [selectedIssueState, setIssueState] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateIssueMutation = useUpdateMutation({
    resource: 'api/review-issue-report',
    contentType: 'application/json',
  });

  const clearFormEntries = () => {
    setOpenSnackbar(true);
    if (inputRef.current) {
      inputRef.current.value = ''; // Clear the input value directly
    }
    setIssueState(''); // Clear the issue state
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
        },
        onError: (error) => {
          console.error('Error updating issue:', error);
          setSnackbarMessage('Failed to update the issue.');
        },
      },
    );
  };

  const handleIssueStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIssueState(event.target.value);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Typography variant="h4" my={4} gutterBottom>
        Review Report
      </Typography>
      <Box ml={2} component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
          >
            <option value=""></option>
            <option value="False Report">False Report</option>
            <option value="Major Issue">Major Issue</option>
            <option value="Minor Issue">Minor Issue</option>
          </TextField>
          <TextField
            label="Requirements to fix"
            variant="outlined"
            name="description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            inputRef={inputRef}
          />
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

export default IssueFixReporting;
