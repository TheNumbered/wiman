import { useGetQuery, useUpdateMutation } from '@/hooks';
import { Users } from '@/interfaces';
import {
  Avatar,
  Button,
  CircularProgress,
  Paper,
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

const UserBanManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search input

  const { data: users, isLoading } = useGetQuery<Users[]>({
    resource: 'api/admin/users',
  });

  const { mutate: updateRole } = useUpdateMutation({
    resource: 'api/admin/toggle-ban',
    invalidateKeys: ['api/admin/users'],
    onSuccessMessage: 'User status updated successfully!',
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
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="text.secondary">
                  Name
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" color="text.secondary">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers?.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={user.profileUrl}
                      alt={user.fullName}
                      sx={{ width: 40, height: 40, mr: 2 }}
                    />
                    <Typography variant="body1">{user.fullName}</Typography>
                  </div>
                </TableCell>

                <TableCell>
                  <Button
                    variant="contained"
                    sx={{
                      '&:hover': {
                        opacity: 0.8,
                      },
                    }}
                    color={user.blocked ? 'success' : 'error'}
                    onClick={() => {
                      updateRole({
                        id: user.userId,
                        data: { blocked: user.blocked ? 0 : 1 },
                      });
                    }}
                  >
                    {user.blocked ? 'Unban' : 'Ban'}
                  </Button>
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

export default UserBanManagement;
