import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#003b5c', // Navy Blue
    },
    secondary: {
      main: '#f99326', // Gold
    },
    background: {
      default: '#F5F5F5', // Light Gray Background
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    // h1: {
    //   fontSize: '3rem',
    //   fontWeight: 700,
    //   color: '#003b5c', // Navy Blue
    // },
    // h2: {
    //   fontSize: '2.5rem',
    //   fontWeight: 600,
    //   color: '#917248', // Gold
    // },
    // body1: {
    //   fontSize: '1rem',
    //   lineHeight: 1.5,
    //   color: '#333333', // Dark Gray Text
    // },
    // button: {
    //   textTransform: 'none',
    //   fontSize: '1rem',
    // },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '10px 20px',
          '&:hover': {
            boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '20px',
          borderRadius: 20,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;
