import { Box, Button, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface SingleIssueReportProps {
  id: string;
  token: string; // Add token prop
  onSetBackButtonClick: () => void;
  onStatusChange: (id: string, newStatus: string) => void;
}

const SingleIssueReport: React.FC<SingleIssueReportProps> = ({
  id,
  token,
  onSetBackButtonClick,
  onStatusChange,
}) => {
  const [issueData, setIssueData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/issue-reports/${id}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });
        setIssueData(response.data);
      } catch (err: any) {
        setError('Failed to load issue report.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [id, token]);

  const handleApproveClick = async () => {
    const newStatus = 'Resolved';
    try {
      await axios.put(
        `http://localhost:3000/api/issue-reports/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        },
      );
      onStatusChange(id, newStatus);
    } catch (err: any) {
      setError('Failed to update issue status.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%', padding: '1rem' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: '100%', padding: '1rem' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!issueData) {
    return <Typography>No issue data available.</Typography>;
  }

  return (
    <Box sx={{ width: '100%', padding: '0 1rem 2rem' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000', lineHeight: '0.9' }}>
        {issueData.title || 'No Title Available'}
      </Typography>
      <Box my={1}>
        <Typography color="black" variant="h6">
          Problem Description
        </Typography>
        <Typography>{issueData.description || 'No description provided.'}</Typography>
      </Box>

      <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onSetBackButtonClick} variant="outlined" size="medium" color="primary">
          Back to List
        </Button>
        {issueData.status !== 'Resolved' && (
          <Button onClick={handleApproveClick} variant="contained" size="medium" color="primary">
            Approve
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SingleIssueReport;
