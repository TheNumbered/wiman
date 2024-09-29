import ErrorView from '@/components/error-view';
import TimeAgo from '@/components/time-ago';
import { Maintenance as Issue } from '@/interfaces';
import { DoneOutlineRounded, NavigateNext, ReportProblem, Timelapse } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';
import { useGetQuery } from '../../hooks/get-query';

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

const IssueReportsList = ({ onSelect }: { onSelect: (id: number) => void }) => {
  const { data, isLoading, isError, error } = useGetQuery<Issue[]>({
    resource: 'api/maintenance/issue-reports',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null); // For filtering by status
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const isMobileView = useMediaQuery('(max-width:1300px)');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleFilterSelect = (status: string | null) => {
    setStatusFilter(status);
    setSelectedFilter(status); // Update the selected filter
    setAnchorEl(null);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const filteredData = (data ?? []).filter((issue) => {
    const matchesSearch = issue.issueDescription.toLowerCase().includes(searchQuery);
    const matchesStatus = statusFilter ? issue.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <Container
        sx={{
          width: '100%',
          height: '100%',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return <ErrorView message={'Could Not Load Issue Reports, ' + error} />;
  }

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      // href="/material-ui/getting-started/installation/"
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
        sx={{ marginBottom: '1rem', mt: { xs: 2, md: 0 } }}
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
      {/* Box with Filter Menu (visible on small screens) */}
      {isMobileView && (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Button fullWidth variant="text" onClick={handleFilterClick}>
            Filter by Status
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose}>
            <MenuItem onClick={() => handleFilterSelect(null)}>All</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('In Progress')}>In Progress</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('Resolved')}>Resolved</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('Reported')}>Reported</MenuItem>
          </Menu>
        </Box>
      )}

      {/* Box with Buttons (hidden on small screens) */}
      {!isMobileView && (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Button
            variant={selectedFilter === null ? 'contained' : 'outlined'}
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
      )}
      <Box>
        {/* Render filtered issue reports */}
        {filteredData?.map((issue: Issue) => (
          <Box
            key={issue.issueId}
            sx={{
              mb: 2,
              cursor: 'pointer',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #e7e7e7',
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: 'background.default',
              },
            }}
            onClick={() => onSelect(issue.issueId)}
          >
            <Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="h6" component="p" color="#777">
                  #{issue.issueId} -
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ marginLeft: '5px', fontWeight: 'bold' }}
                >
                  {issue.venueId || 'No Title'}
                </Typography>
              </Box>
              <Typography>{issue.issueDescription || 'No Location'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: getBorderColorByStatus(issue.status ?? 'Reported'),
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.2rem 0.8rem',
                  height: 'min-content',
                  background: getBgColorByStatus(issue.status ?? 'Reported'),
                  width: 'min-content',
                  marginRight: '5px',
                }}
              >
                {getStatusIcon(issue.status ?? 'Reported')}
                {
                  /* Status */
                  //make the color contrast
                }
                <Typography sx={{ width: 'max-content', color: '#333' }}>{issue.status}</Typography>
              </Box>
              <TimeAgo timestamp={new Date(issue.reportedDate).toLocaleString()} />
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default IssueReportsList;
