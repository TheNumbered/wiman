import { Box, Container, TextField, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetQuery } from '../../hooks/get-query'; // Adjust the path as per your project structure

const IssueReportsList = ({ onSelect }: { onSelect: (id: string) => void }) => {
  // Fetch the list of issue reports using the useGetQuery hook
  const { data, isLoading, isError, error } = useGetQuery({
    resource: 'api/issue-reports',
  });

  if (isLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Typography color="error">Failed to load issue reports: {error.message}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h2">
        Maintenance Problems
      </Typography>
      <TextField fullWidth label="Search" variant="standard" />
      <Box mt={4}>
        {/* Render issue reports */}
        {data.map((issue: any) => (
          <Box
            key={issue.issue_id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 2,
              cursor: 'pointer', // Make the box clickable
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
              '&:hover': { backgroundColor: '#f5f5f5' },
            }}
            onClick={() => onSelect(issue.issue_id)} // Pass the selected issue's ID
          >
            <Box>
              <Typography variant="h6" component="p">
                {issue.issue_description || 'No Title'}
              </Typography>
              <Typography>{issue.room_id || 'No Location'}</Typography>
            </Box>
            <Typography>{new Date(issue.reported_date).toLocaleString()}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default IssueReportsList;
