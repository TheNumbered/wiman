import { useGetQuery, useUpdateMutation } from '@/hooks';
import { Users } from '@/interfaces';
import {
  Alert,
  CircularProgress,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const RoleChangeRequests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search input

  const {
    data: users,
    isError,
    isLoading,
  } = useGetQuery<Users[]>({
    resource: 'api/admin/users',
  });

  const { mutate: updateRole } = useUpdateMutation({
    resource: 'api/admin/update-role',
    invalidateKeys: ['api/admin/users'],
    onSuccessMessage: 'Role updated successfully!',
  });

  // Filter users based on search term
  const filteredUsers = users?.filter((user) =>
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading)
    return (
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: 4,
        }}
      >
        <CircularProgress />
      </Paper>
    );

  return (
    <Paper sx={{ p: 4, maxWidth: '900px', margin: '0 auto' }}>
      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Error fetching users. Please try again later.
        </Alert>
      )}

      {/* Search Bar */}
      <TextField
        fullWidth
        label="Search Users"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="text.secondary">
                  Name
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6" color="text.secondary">
                  Role
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers?.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell align="right">
                  <FormControl fullWidth>
                    {/* <InputLabel>Role</InputLabel> */}
                    <Select
                      value={user.role}
                      onChange={(e) => {
                        updateRole({ id: user.userId, data: { role: e.target.value } });
                      }}
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="maintenance">Maintenance</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Show message if no users match the search */}
      {filteredUsers?.length === 0 && (
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 2 }}>
          No users found.
        </Typography>
      )}
    </Paper>
  );
};

export default RoleChangeRequests;
