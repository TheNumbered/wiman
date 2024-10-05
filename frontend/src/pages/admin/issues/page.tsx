import { AdvancedIssue } from '@/interfaces';
import { Button, Grid, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import IssueDetails from './issue-detail';
import IssuesList from './issue-list';

const IssuesPage = () => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const [selectedIssue, setSelectedIssue] = useState<AdvancedIssue | null>(null);

  const handleIssueClick = (issue: AdvancedIssue) => {
    setSelectedIssue(issue);
  };

  return (
    <Grid container p={{ xs: 2, md: 0 }} spacing={2}>
      {/* Left Side: List of Issues */}
      {!(isMobile && selectedIssue) && (
        <Grid item xs={12} md={5} pl={{ xs: 0, md: 8 }}>
          <IssuesList onIssueClick={handleIssueClick} />
        </Grid>
      )}
      {/* Right Side: Detailed View */}
      {!(isMobile && !selectedIssue) && (
        <Grid item xs={12} md={7}>
          <Button
            variant="text"
            onClick={() => setSelectedIssue(null)}
            sx={{ display: isMobile && selectedIssue ? 'block' : 'none', mb: 2 }}
          >
            {'<   Back to Issues List'}
          </Button>
          <IssueDetails issue={selectedIssue} />
        </Grid>
      )}
    </Grid>
  );
};

export default IssuesPage;
