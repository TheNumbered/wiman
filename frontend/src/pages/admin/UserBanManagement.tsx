import { useAuth } from '@clerk/clerk-react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  blocked: number; // 0 for not blocked, 1 for blocked
}

const UserBanManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://localhost:3000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setUsers(response.data);
          setError(null);
        } else {
          setError('Unexpected data format.');
        }
      } catch (error) {
        setError('Error fetching users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [getToken]);

  const handleToggleBlock = async (id: number, blocked: number) => {
    try {
      const token = await getToken();
      await axios.put(
        `http://localhost:3000/api/toggle-ban/${id}`,
        { blocked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUsers(users.map((user) => (user.id === id ? { ...user, blocked } : user)));
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error toggling block status:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading)
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

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

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
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.blocked === 0 ? 'Active' : 'Banned'}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: user.blocked === 0 ? 'red' : 'green',
                      color: 'white',
                      '&:hover': {
                        opacity: 0.8,
                      },
                    }}
                    onClick={() => handleToggleBlock(user.id, user.blocked === 0 ? 1 : 0)}
                  >
                    {user.blocked === 0 ? 'Ban' : 'Unban'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Block status updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserBanManagement;
