import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0159a1', // Navy Blue
    },
    secondary: {
      main: '#f99326', // Gold
    },
    background: {
      default: '#F5F5F5', // Light Gray Background
    },
    error: {
      main: '#f44336', // Red
      light: '#e57373', // Light Red
      dark: '#d32f2f', // Dark Red
      contrastText: '#ffffff', // White text
    },
    warning: {
      main: '#ff9800', // Orange
      light: '#ffb74d', // Light Orange
      dark: '#f57c00', // Dark Orange
      contrastText: '#000000', // Black text
    },
    success: {
      main: '#4caf50', // Green
      light: '#81c784', // Light Green
      dark: '#388e3c', // Dark Green
      contrastText: '#ffffff', // White text
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
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
          // boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
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
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          '&.Mui-selected': {
            background: '#f99326',
            color: '#fff',
          },
          '&.Mui-selected:hover': {
            background: '#d3893a',
            color: '#fff',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
  },
});

export const scrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#999',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#999',
  },
  scrollbarWidth: 'thin', // Firefox
  scrollbarColor: '#ffddb8 #fff7ef', // Firefox
};

export default theme;
