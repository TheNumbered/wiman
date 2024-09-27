// MaintenanceIssueDetails.tsx
import { Box, Button, Chip, Paper, Typography } from '@mui/material';
import React from 'react';

interface MaintenanceIssue {
  issueDescription: string;
  maintenanceImageUrl: string; // updated field
  resolutionLog: string | null;
  amenities: string[];
  underMaintenance: number;
}

interface MaintenanceIssueDetailsProps {
  issue: MaintenanceIssue | null;
  onChangeAvailability: (issue: MaintenanceIssue) => void; // Function to handle availability change
}

const MaintenanceIssueDetails: React.FC<MaintenanceIssueDetailsProps> = ({
  issue,
  onChangeAvailability,
}) => {
  if (!issue) {
    return <Typography variant="h6">Select an issue to view its details</Typography>;
  }

  const handleChangeAvailability = () => {
    const updatedIssue = {
      ...issue,
      underMaintenance: issue.underMaintenance === 1 ? 0 : 1, // Toggle underMaintenance
    };
    onChangeAvailability(updatedIssue); // Call the parent function to handle the update
  };

  // Parse resolutionLog if it exists
  const resolutionLogData = issue.resolutionLog ? JSON.parse(issue.resolutionLog) : null;

  return (
    <Box>
      {issue.maintenanceImageUrl && (
        <Box mb={2}>
          <img
            src={issue.maintenanceImageUrl}
            alt="Maintenance Issue"
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
      )}
      <Typography variant="h5">Issue Details</Typography>
      <Typography variant="body1">Description: {issue.issueDescription}</Typography>

      {/* Display Resolution Log in a styled manner */}
      {resolutionLogData && (
        <Paper elevation={2} sx={{ padding: 2, marginTop: 2 }}>
          <Typography variant="h6">Resolution Log:</Typography>
          <Typography variant="body1">
            <strong>Problem Class:</strong> {resolutionLogData['Problem Class']}
          </Typography>
          <Typography variant="body1">
            <strong>Requirements To Fix:</strong> {resolutionLogData['Requirements To Fix']}
          </Typography>
          <Typography variant="body1">
            <strong>Set Back:</strong> {resolutionLogData['Set Back'] || 'N/A'}
          </Typography>
        </Paper>
      )}

      <Typography variant="body1">
        Under Maintenance: {issue.underMaintenance ? 'Yes' : 'No'}
      </Typography>
      <Typography variant="body1">Amenities:</Typography>
      <Box mb={2}>
        {issue.amenities.map((amenity, index) => (
          <Chip
            key={index}
            label={amenity}
            style={{ marginRight: 8, cursor: 'pointer' }}
            onClick={() => console.log(`Clicked on ${amenity}`)} // Optional click handler
          />
        ))}
      </Box>
      <Button
        variant="contained"
        color={issue.underMaintenance ? 'success' : 'warning'}
        onClick={handleChangeAvailability}
        style={{ marginTop: 16 }}
      >
        Change Availability
      </Button>
    </Box>
  );
};

export default MaintenanceIssueDetails;
