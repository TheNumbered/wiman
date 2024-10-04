import { Box, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ErrorProps {
  errorTitle?: string;
  errorMessage: string;
  onRetry: () => void; // Function to retry the action
}

const ErrorComponent: React.FC<ErrorProps> = ({ errorTitle, errorMessage, onRetry }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.default"
      px={2}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: {
            xs: '90vw', // 90% width on extra-small screens
            sm: '70vw', // 70% width on small screens
            md: '50vw', // 50% width on medium screens
            lg: '30vw', // 30% width on large screens
          },
          textAlign: 'center',
          borderRadius: 2,
          backgroundColor: 'theme.palette.background.default',
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold" color="error">
          {errorTitle || 'An error occurred'}
        </Typography>

        <Typography variant="body1" gutterBottom color="textSecondary">
          {errorMessage}
        </Typography>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="contained"
            onClick={onRetry}
            color="primary"
            sx={{
              color: 'background.default',
              px: 4,
              py: 1.5,
              width: {
                xs: '45%', // Button width adjustment for small screens
                sm: 'auto', // Auto width for larger screens
              },
            }}
          >
            Retry
          </Button>

          <Button
            variant="outlined"
            onClick={handleBack}
            color="primary"
            sx={{
              px: 4,
              py: 1.5,
              width: {
                xs: '45%', // Button width adjustment for small screens
                sm: 'auto', // Auto width for larger screens
              },
            }}
          >
            Go Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ErrorComponent;
