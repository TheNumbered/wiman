import { useAuth } from '@clerk/clerk-react';
import { Alert, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import IssueReportsList from './issue-reports-list';
import SingleIssueReport from './single-issue-report';

const MaintenancePage: React.FC = () => {
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = await getToken();
        setToken(token || ''); // Save token in state

        const response = await axios.get('http://localhost:3000/api/issue-reports', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`, // Use the token in the Authorization header
          },
        });

        console.log('Fetched data:', response.data);
        if (Array.isArray(response.data)) {
          setIssues(response.data);
        } else {
          console.error('Data is not an array:', response.data);
          setIssues([]);
        }
      } catch (err) {
        console.error('Error fetching issues:', err);
        setError('Error loading issues.');
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [getToken]);

  const handleSelectIssue = (id: string) => {
    setSelectedIssueId(id);
  };

  const handleBackToList = () => {
    setSelectedIssueId(null);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    console.log(`Status for issue ${id} changed to ${newStatus}`);
  };

  if (loading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (issues.length === 0) {
    return <div>No issues found</div>;
  }

  return (
    <Box sx={{ p: 3 }}>
      {selectedIssueId ? (
        <SingleIssueReport
          id={selectedIssueId}
          token={token || ''} // Pass token to SingleIssueReport
          onSetBackButtonClick={handleBackToList}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <IssueReportsList issues={issues} onSelect={handleSelectIssue} />
      )}
    </Box>
  );
};

export default MaintenancePage;
