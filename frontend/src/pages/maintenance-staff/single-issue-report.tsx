import AutohideSnackbar from '@/components/snackbar';
import { IssueReport } from '@/interfaces';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useUpdateMutation } from '../../hooks'; // Import your updateMutation hook
import { useGetQuery } from '../../hooks/get-query';

type SnackbarType = 'error' | 'success' | 'info' | 'warning';

const SingleIssueReport = ({
  id,
  onReviewButtonClick,
  onSetBackButtonClick,
}: {
  id: string;
  onReviewButtonClick: () => void;
  onSetBackButtonClick: () => void;
}) => {
  const { data, isLoading, isError, error } = useGetQuery<IssueReport[]>({
    resource: `api/single-issue-report/${id}`,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackBarType] = useState<SnackbarType>('info');
  const [dialogOpen, setDialogOpen] = useState(false);

  const updateIssueMutation = useUpdateMutation({
    resource: 'api/close-issue-report',
    contentType: 'application/json',
  });

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmClose = () => {
    updateIssueMutation.mutate(
      {
        id: id as string | number,
        data: {},
      },
      {
        onSuccess: (responseData) => {
          console.log('Issue closed:', responseData);
          setSnackbarMessage(responseData.message || 'Issue closed successfully.');
          setSnackBarType('success');
          setOpenSnackbar(true);
          handleCloseDialog();
        },
        onError: (error) => {
          console.error('Error closing issue:', error);
          setSnackbarMessage('Failed to close the issue.');
          setSnackBarType('error');
          setOpenSnackbar(true);
          handleCloseDialog();
        },
      },
    );
  };

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

  // Add a check to ensure `data` is defined and has items
  if (!data || data.length === 0) {
    return (
      <Box sx={{ width: '100%', padding: '1rem' }}>
        <Typography>No data available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', padding: '0 1rem 2rem' }}>
      <img
        src={data[0].image_url ? data[0].image_url : 'https://via.placeholder.com/400'}
        alt="issue image"
        style={{ width: '100%', borderRadius: '1rem', marginBottom: '1rem' }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ color: '#777' }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 'bold', color: '#000', lineHeight: '0.9' }}
          >
            {data[0].room_id || 'No Title Available'}
          </Typography>
          <Typography>{data[0].room_id || 'No Location Available'}</Typography>
          <Box my={1}>
            <Typography color="black" variant="h6">
              Problem Description
            </Typography>
            <Typography>{data[0].issue_description || 'No description provided.'}</Typography>
            <Typography color="black" variant="h6">
              Resolution Log
            </Typography>
            {data[0].status !== 'Reported' ? (
              (() => {
                const resolutionLog = data[0].resolution_log
                  ? JSON.parse(data[0].resolution_log)
                  : null;
                return resolutionLog ? (
                  <Box>
                    <Typography sx={{ fontWeight: 'bold' }}>Problem Class</Typography>
                    <Typography sx={{ marginBottom: '0.5rem' }}>
                      {resolutionLog['Problem Class'] || 'No data available'}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Requirements To Fix</Typography>
                    <Typography sx={{ marginBottom: '0.5rem' }}>
                      {resolutionLog['Requirements To Fix'] || 'No data available'}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>Set Back</Typography>
                    <Typography sx={{ marginBottom: '0.5rem' }}>
                      {resolutionLog['Set Back'] || 'No data available'}
                    </Typography>
                  </Box>
                ) : (
                  <Typography>No resolution log available</Typography>
                );
              })()
            ) : (
              <Typography>Pending Review From Maintenance Staff</Typography>
            )}
          </Box>
        </Box>
      </Box>
      {(() => {
        switch (data[0].status) {
          case 'Reported':
            return (
              <Box mt={2}>
                <Button
                  onClick={onReviewButtonClick}
                  variant="contained"
                  size="medium"
                  color="secondary"
                  sx={{ color: '#fff' }}
                >
                  Review
                </Button>
              </Box>
            );
          case 'In Progress':
            return (
              <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  onClick={onSetBackButtonClick}
                  variant="outlined"
                  size="medium"
                  color="primary"
                  sx={{ marginRight: '1rem' }}
                >
                  Report Set Back
                </Button>
                <Button
                  onClick={() => setDialogOpen(true)}
                  variant="contained"
                  size="medium"
                  color="primary"
                >
                  Close Issue
                </Button>
              </Box>
            );
          case 'Resolved':
            return <Typography>Issue has been closed</Typography>;
          default:
            return '';
        }
      })()}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Report Issue As Resolved</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#999' }}>
            You are about to report this issue as resolved to the admin. Are you sure this issue has
            been resolved as expected and the venue is ready for public use?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmClose} color="error">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      <AutohideSnackbar
        message={snackbarMessage}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        severity={snackbarType}
      />
    </Box>
  );
};

export default SingleIssueReport;
