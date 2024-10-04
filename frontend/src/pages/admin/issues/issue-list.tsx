import { useGetQuery } from '@/hooks';
import { AdvancedIssue } from '@/interfaces';
import { NavigateNext } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import useSecurityIssues from './security-issues-utils';

interface IssuesListProps {
  onIssueClick: (issue: any) => void;
}

const IssuesList: React.FC<IssuesListProps> = ({ onIssueClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 5; // Items to show per page

  const { data } = useGetQuery<AdvancedIssue[]>({
    resource: 'api/admin/issues-in-progress',
  });
  const securityIssues = useSecurityIssues();

  // Filtered issues from both API data and security issues
  let filteredMaintenaceIssues = (data || []).filter(
    (issue) =>
      issue.issueDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.venueId.toString().toLowerCase().includes(searchQuery.toLowerCase()),
  );

  let filteredSecurityIssues = securityIssues.filter(
    (issue) =>
      issue.issueDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.venueId.toString().toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Filter by type
  if (typeFilter === 'maintenance') {
    filteredSecurityIssues = [];
  } else if (typeFilter === 'security') {
    filteredMaintenaceIssues = [];
  }

  // Combine both filtered lists
  const combinedIssues = [...filteredMaintenaceIssues, ...filteredSecurityIssues];

  // Pagination logic
  const totalItems = combinedIssues.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedIssues = combinedIssues.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter]);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Link underline="hover" key="2" color="inherit">
      Advanced Issues
    </Link>,
  ];

  return (
    <Box pl={4}>
      {/* Search input */}
      <Breadcrumbs
        sx={{ marginBottom: '1rem', mt: { xs: 2, md: 0 } }}
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <TextField
        label="Search Issues"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Status Filter Buttons */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Button
          variant={typeFilter === null ? 'contained' : 'outlined'}
          onClick={() => setTypeFilter(null)}
        >
          All
        </Button>
        <Button
          variant={typeFilter === 'maintenance' ? 'contained' : 'outlined'}
          onClick={() => setTypeFilter('maintenance')}
        >
          Maintenance
        </Button>
        <Button
          variant={typeFilter === 'security' ? 'contained' : 'outlined'}
          onClick={() => setTypeFilter('security')}
        >
          Security
        </Button>
      </Box>

      {/* Issues list */}
      <List>
        {paginatedIssues.map((issue) => (
          <ListItemButton
            key={issue?.issueId + issue.venueId}
            divider
            onClick={() => onIssueClick(issue)}
            sx={{
              marginBottom: 1,
              borderRadius: 1,
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

      {/* Pagination controls */}
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
        >
          Previous
        </Button>
        <Typography>{`Page ${currentPage} of ${totalPages}`}</Typography>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default IssuesList;
