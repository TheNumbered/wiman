import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useGetQuery } from '../../hooks/get-query'; // Adjust the import based on your project structure

const SingleIssueReport = ({
  id,
  onReviewButtonClick,
}: {
  id: string;
  onReviewButtonClick: () => void;
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
    <Box sx={{ width: '100%', padding: '1rem' }}>
      <img
        src={data?.image_url || 'https://via.placeholder.com/400'} // Assuming the image URL is part of the response
        alt=""
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
            <Typography>{data ? data[0].resolution_log : 'No description provided.'}</Typography>
          </Box>
        </Box>
        {/* <Typography>{data ? `${data[0].reported_date} Ago` : 'Unknown time'}</Typography> */}
      </Box>
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
    </Box>
  );
};

export default SingleIssueReport;
