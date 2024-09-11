import TimeAgo from '@/components/time-ago';
import { DoneOutlineRounded, NavigateNext, ReportProblem, Timelapse } from '@mui/icons-material';
import { Box, Breadcrumbs, Button, Container, Link, TextField, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';
import { useGetQuery } from '../../hooks/get-query'; // Adjust the path as per your project structure

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Resolved':
      return <DoneOutlineRounded sx={{ color: 'green', marginRight: '5px', fontSize: '1.3rem' }} />;
    case 'In Progress':
      return <Timelapse sx={{ color: '#4894ff', marginRight: '5px', fontSize: '1.3rem' }} />;
    case 'Reported':
      return <ReportProblem sx={{ color: 'orange', marginRight: '5px', fontSize: '1.3rem' }} />;
    default:
      return null;
  }
};

const getBgColorByStatus = (status: string) => {
  switch (status) {
    case 'Resolved':
      return '#e0ffe0';
    case 'In Progress':
      return '#e8f4ff';
    case 'Reported':
      return '#fff3e0';
    default:
      return '#e8f4ff';
  }
};

const getBorderColorByStatus = (status: string) => {
  switch (status) {
    case 'Resolved':
      return '#79FF75';
    case 'In Progress':
      return '#91cbff';
    case 'Reported':
      return '#ffbc51';
    default:
      return '#e8f4ff';
  }
};

const IssueReportsList = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const { data, isLoading, isError, error } = useGetQuery({
    resource: 'api/issue-reports',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null); // For filtering by status
  const [, setAnchorEl] = useState<null | HTMLElement>(null); // For the filter menu
  // State to track the selected filter
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleFilterSelect = (status: string | null) => {
    setStatusFilter(status);
    setSelectedFilter(status); // Update the selected filter
    setAnchorEl(null);
  };

  const filteredData = data?.filter((issue: any) => {
    const matchesSearch = issue.issue_description.toLowerCase().includes(searchQuery);
    const matchesStatus = statusFilter ? issue.status === statusFilter : true;
    return matchesSearch && matchesStatus;
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

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
    >
      Maintenance Issues
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      List
    </Typography>,
  ];

  return (
    <Container>
      <Breadcrumbs
        style={{ marginBottom: '1rem' }}
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Typography variant="h4" component="h2">
        Maintenance Problems
      </Typography>
      <TextField
        fullWidth
        label="Search"
        variant="standard"
        value={searchQuery}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Button
          variant={selectedFilter === null ? 'contained' : 'outlined'} // 'contained' for the selected filter
          onClick={() => handleFilterSelect(null)}
        >
          All
        </Button>
        <Button
          variant={selectedFilter === 'In Progress' ? 'contained' : 'outlined'}
          onClick={() => handleFilterSelect('In Progress')}
        >
          In Progress
        </Button>
        <Button
          variant={selectedFilter === 'Resolved' ? 'contained' : 'outlined'}
          onClick={() => handleFilterSelect('Resolved')}
        >
          Resolved
        </Button>
        <Button
          variant={selectedFilter === 'Reported' ? 'contained' : 'outlined'}
          onClick={() => handleFilterSelect('Reported')}
        >
          Reported
        </Button>
      </Box>
      <Box>
        {/* Render filtered issue reports */}
        {filteredData?.map((issue: any) => (
          <Box
            key={issue.issue_id}
            sx={{
              mb: 2,
              cursor: 'pointer',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #e7e7e7',
              '&:hover': { backgroundColor: '#f5f5f5' },
            }}
            onClick={() => onSelect(issue.issue_id)}
          >
            <Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="h6" component="p" color="#777">
                  #{issue.issue_id} -
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ marginLeft: '5px', fontWeight: 'bold' }}
                >
                  {issue.issue_description || 'No Title'}
                </Typography>
              </Box>
              <Typography>{issue.room_id || 'No Location'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: getBorderColorByStatus(issue.status),
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.2rem 0.8rem',
                  height: 'min-content',
                  background: getBgColorByStatus(issue.status),
                  width: 'min-content',
                  marginRight: '5px',
                }}
              >
                {getStatusIcon(issue.status)}
                <Typography sx={{ width: 'max-content' }}>{issue.status}</Typography>
              </Box>
              <TimeAgo timestamp={new Date(issue.reported_date).toLocaleString()} />
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default IssueReportsList;
