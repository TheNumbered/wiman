import { useGetQuery, useUpdateMutation } from '@/hooks';
import { Users } from '@/interfaces';
import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';

const RoleChangeRequests: React.FC = () => {
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

  if (isLoading)
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="blue">
        Change User Roles
      </Typography>
      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Error fetching users. Please try again later.
        </Alert>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="orange">
                  Name
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6" color="blue">
                  Role
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell align="right">
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={user.role}
                      onChange={(e) => {
                        //console.log({ id: user.userId, data: { role: e.target.value } });
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
    </Box>
  );
};

export default RoleChangeRequests;
