import { createTheme } from '@mui/material/styles';

const theme = (mode: 'dark' | 'light') =>
  createTheme({
    palette: {
      mode: mode ?? 'light',
      primary: {
        main: '#0159a1', // Navy Blue
      },
      secondary: {
        main: '#f99326', // Gold
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#ffffff', // Dark mode background or light mode background
        paper: mode === 'dark' ? '#1e1e1e' : '#fafafa', // Dark mode paper or light mode paper
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#333333', // White text for dark mode, dark text for light mode
        secondary: mode === 'dark' ? '#bbbbbb' : '#666666', // Lighter text color
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
      // Example typography overrides
      // h1: {
      //   fontSize: '3rem',
      //   fontWeight: 700,
      //   color: mode === 'dark' ? '#ffffff' : '#003b5c', // Conditional color based on mode
      // },
      // h2: {
      //   fontSize: '2.5rem',
      //   fontWeight: 600,
      //   color: mode === 'dark' ? '#bbbbbb' : '#917248',
      // },
      // body1: {
      //   fontSize: '1rem',
      //   lineHeight: 1.5,
      //   color: mode === 'dark' ? '#e0e0e0' : '#333333',
      // },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
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
            backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            '&.Mui-selected': {
              background: mode === 'dark' ? '#f99326' : '#f99326',
              color: '#fff',
            },
            '&.Mui-selected:hover': {
              background: mode === 'dark' ? '#d3893a' : '#d3893a',
              color: '#fff',
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#ffffff' : 'inherit',
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
