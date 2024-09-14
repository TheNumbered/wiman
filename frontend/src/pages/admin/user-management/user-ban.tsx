import { useGetQuery, useUpdateMutation } from '@/hooks';
import { Users } from '@/interfaces';
import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';

const UserBanManagement: React.FC = () => {
  const { data: users, isLoading } = useGetQuery<Users[]>({
    resource: 'api/admin/users',
  });

  const { mutate: updateRole } = useUpdateMutation({
    resource: 'api/admin/toggle-ban',
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
      <Typography variant="h4" gutterBottom align="left" color="blue">
        Ban and Unban Users
      </Typography>

      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" color="orange">
                  Name
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6" color="black">
                  Status
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" color="blue">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.blocked ? 'Active' : 'Banned'}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: user.blocked ? 'red' : 'green',
                      color: 'white',
                      '&:hover': {
                        opacity: 0.8,
                      },
                    }}
                    onClick={() => {
                      updateRole({
                        id: user.userId,
                        data: { blocked: user.blocked ? 0 : 1 },
                      });
                    }}
                  >
                    {user.blocked ? 'Ban' : 'Unban'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserBanManagement;
