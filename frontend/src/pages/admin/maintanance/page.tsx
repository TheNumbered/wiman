// MaintenanceIssuesPage.tsx
import { useGetQuery } from '@/hooks';
import { MaintenanceIssue } from '@/interfaces';
import { Grid } from '@mui/material';
import { useState } from 'react';
import MaintenanceIssueDetails from './issue-detail';
import MaintenanceIssuesList from './issue-list';

const MaintenanceIssuesPage = () => {
  const { data } = useGetQuery<MaintenanceIssue[]>({
    resource: 'api/admin/issues-in-progress',
  });

  const [selectedIssue, setSelectedIssue] = useState<MaintenanceIssue | null>(null);

  const handleIssueClick = (issue: MaintenanceIssue) => {
    setSelectedIssue(issue);
  };

  return (
    <Grid container p={{ xs: 2, md: 0 }} spacing={2}>
      {/* Left Side: List of Issues */}
      <Grid item xs={12} md={5} pl={{ xs: 0, md: 8 }}>
        <MaintenanceIssuesList issues={data || []} onIssueClick={handleIssueClick} />
      </Grid>

      {/* Right Side: Detailed View */}
      <Grid item xs={12} md={7}>
        <MaintenanceIssueDetails issue={selectedIssue} />
      </Grid>
    </Grid>
  );
};

export default MaintenanceIssuesPage;
