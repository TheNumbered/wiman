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
        default: mode === 'dark' ? '#232323' : '#ffffff', // Soften the dark mode background
        paper: mode === 'dark' ? '#181818' : '#fafafa', // Paper is lighter in dark mode
      },
      text: {
        primary: mode === 'dark' ? '#e0e0e0' : '#333333', // Light gray for dark mode text
        secondary: mode === 'dark' ? '#b0b0b0' : '#666666', // Softer text color
      },
      error: {
        main: '#f44336', // Red
        light: '#e57373', // Light Red
        dark: '#d32f2f', // Dark Red
        contrastText: '#ffffff',
      },
      warning: {
        main: '#ff9800', // Orange
        light: '#ffb74d', // Light Orange
        dark: '#f57c00', // Dark Orange
        contrastText: '#000000',
      },
      success: {
        main: '#4caf50', // Green
        light: '#81c784', // Light Green
        dark: '#388e3c', // Dark Green
        contrastText: '#ffffff',
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
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '10px 20px',
            '&:hover': {
              boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)',
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
            backgroundColor: mode === 'dark' ? '#232323' : '#ffffff', // Lightened dark mode background
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            backgroundColor: mode === 'dark' ? '#232323' : '#ffffff', // Consistent with paper
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
    backgroundColor: '#999', // Slight hover change
  },
  scrollbarWidth: 'thin', // Firefox
  scrollbarColor: '#ffddb8 #fff7ef', // Firefox
};

export default theme;
