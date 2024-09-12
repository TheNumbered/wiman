import { Box, Button, Typography } from '@mui/material';

interface IssueReportsListProps {
  issues: any[];
  onSelect: (id: string) => void;
}

const IssueReportsList: React.FC<IssueReportsListProps> = ({ issues, onSelect }) => {
  return (
    <Box>
      {issues.length > 0 ? (
        issues.map((issue) => (
          <Box key={issue.id} sx={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <Typography variant="h6">{issue.title || 'No Title Available'}</Typography>
            <Button onClick={() => onSelect(issue.id)} variant="contained" color="primary">
              View Details
            </Button>
          </Box>
        ))
      ) : (
        <Typography>No issues available.</Typography>
      )}
    </Box>
  );
};

export default IssueReportsList;
