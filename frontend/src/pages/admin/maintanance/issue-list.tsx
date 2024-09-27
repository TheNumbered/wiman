// MaintenanceIssuesList.tsx
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

interface MaintenanceIssue {
  issueId: number;
  issueDescription: string;
  roomId: string;
}

interface MaintenanceIssuesListProps {
  issues: MaintenanceIssue[];
  onIssueClick: (issue: MaintenanceIssue) => void;
}

const MaintenanceIssuesList: React.FC<MaintenanceIssuesListProps> = ({ issues, onIssueClick }) => {
  return (
    <List>
      {issues.map((issue) => (
        <ListItem key={issue.issueId} button divider onClick={() => onIssueClick(issue)}>
          <ListItemText
            primary={`Issue: ${issue.issueDescription}`}
            secondary={
              <Typography variant="body2" color="textSecondary">
                Venue: {issue.roomId}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default MaintenanceIssuesList;
