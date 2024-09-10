import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useGetQuery } from '../../hooks/get-query'; // Adjust the import based on your project structure

const SingleIssueReport = ({
  id,
  onReviewButtonClick,
  onSetBackButtonClick,
}: {
  id: string;
  onReviewButtonClick: () => void;
  onSetBackButtonClick: () => void;
}) => {
  // Fetch the single issue report based on the given id
  const { data, isLoading, isError, error } = useGetQuery({
    resource: `api/single-issue-report/${id}`,
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
  return (
    <Box sx={{ width: '100%', padding: '0 1rem 2rem' }}>
      <img
        src={data[0].image_url ? data[0].image_url : 'https://via.placeholder.com/400'} // Assuming the image URL is part of the response
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
            {data ? data[0].room_id : 'No Title Available'}
          </Typography>
          <Typography>{data ? data[0].room_id : 'No Location Available'}</Typography>
          <Box my={1}>
            <Typography color="black" variant="h6">
              Problem Description
            </Typography>
            <Typography>{data ? data[0].issue_description : 'No description provided.'}</Typography>
            <Typography color="black" variant="h6">
              Resolution Log
            </Typography>
            {data[0].status !== 'Reported' ? (
              (() => {
                // Safely check if resolution_log is not null or empty
                const resolutionLog = data[0].resolution_log
                  ? JSON.parse(data[0].resolution_log)
                  : null;

                // If resolutionLog exists, render the fields, else show a fallback message
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
                  <Typography>No resolution log available</Typography> // Fallback if log is null
                );
              })()
            ) : (
              <Typography>Pending Review From Maintenance Staff</Typography>
            )}
          </Box>
        </Box>
        {/* <Typography>{data ? `${data[0].reported_date} Ago` : 'Unknown time'}</Typography> */}
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
                  onClick={onReviewButtonClick}
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
    </Box>
  );
};

export default SingleIssueReport;
