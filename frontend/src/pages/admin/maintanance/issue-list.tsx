import { Box, List, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

interface MaintenanceIssuesListProps {
  issues: any[];
  onIssueClick: (issue: any) => void;
}

const MaintenanceIssuesList: React.FC<MaintenanceIssuesListProps> = ({ issues, onIssueClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter issues based on the search query
  const filteredIssues = issues.filter(
    (issue) =>
      issue.issueDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.venueId.toString().toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Box>
      {/* Search input */}
      <TextField
        label="Search Issues"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Issues list */}
      <List>
        {filteredIssues.map((issue) => (
          <ListItemButton
            key={issue.issueId}
            divider
            onClick={() => onIssueClick(issue)}
            sx={{
              border: issue.underMaintenance
                ? '2px solid red' // Red border if under maintenance
                : 'none',
              marginBottom: 1, // Optional margin for better spacing between items
              borderRadius: 1, // Optional border radius for a cleaner look
            }}
          >
            <ListItemText
              primary={`Issue: ${issue.issueDescription}`}
              secondary={
                <Typography variant="body2" color="textSecondary">
                  Venue: {issue.venueId}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default MaintenanceIssuesList;
