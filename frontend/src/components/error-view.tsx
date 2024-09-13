import { Container, Typography } from '@mui/material';

interface ErrorViewProps {
  message: string;
}

const ErrorView: React.FC<ErrorViewProps> = ({ message }) => {
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
      <Typography color="error">{message}</Typography>
    </Container>
  );
};

export default ErrorView;
