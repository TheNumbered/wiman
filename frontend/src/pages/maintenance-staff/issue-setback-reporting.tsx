import AutohideSnackbar from '@/components/snackbar';
import { useUpdateMutation } from '@/hooks';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

interface IssueFixReportingProps {
  issue_id: string;
}

const IssueSetBackReporting: React.FC<IssueFixReportingProps> = ({ issue_id }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const inputRef2 = React.useRef<HTMLInputElement>(null);

  const updateIssueMutation = useUpdateMutation({
    resource: 'api/add-issue-setback-report',
    contentType: 'application/json',
  });

  const clearFormEntries = () => {
    setOpenSnackbar(true);
    if (inputRef.current) {
      inputRef.current.value = ''; // Clear the input value directly
    }
    if (inputRef2.current) {
      inputRef2.current.value = ''; // Clear the input value directly
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      setback: formData.get('description') as string,
      new_fix_requirements: formData.get('fix-requirements') as string,
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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Typography variant="h4" my={4} gutterBottom>
        Set Back Report
      </Typography>
      <Box ml={2} component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <TextField
            label="Set Back Description"
            variant="outlined"
            name="description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            inputRef={inputRef}
          />
          <TextField
            label="Requirements to fix"
            variant="outlined"
            name="fix-requirements"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            inputRef={inputRef2}
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

export default IssueSetBackReporting;
