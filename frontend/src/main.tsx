import { ClerkProvider } from '@clerk/clerk-react';
import { CssBaseline, Theme } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { GlobalProvider } from './hooks/global-provider.tsx';
import ExtendThemeProvider from './theme-provider.tsx';
import theme from './theme.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const currentColorMode = localStorage.getItem('color-mode') as 'light' | 'dark';
const currentTheme = theme(currentColorMode) as Theme;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExtendThemeProvider>
      <CssBaseline />
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl="/"
        appearance={{
          variables: {
            colorPrimary: currentTheme.palette.primary.main,
            colorDanger: currentTheme.palette.error.main,
            colorSuccess: currentTheme.palette.success.main,
            colorWarning: currentTheme.palette.warning.main,
            //colorNeutral: theme.palette.grey[500],
            //colorBackground: theme.palette.background.default,
            //   colorText: theme.palette.text.primary,
            //   colorTextOnPrimaryBackground: theme.palette.primary.contrastText,
            //colorTextSecondary: theme.palette.secondary.main,
            //   colorInputText: theme.palette.text.primary,
            fontFamily: currentTheme.typography.fontFamily,
            fontFamilyButtons: currentTheme.typography.fontFamily,
            //   fontSize: '0.875rem',
            //   borderRadius: '0.25rem',
            //   spacingUnit: '1rem',
          },
          layout: {
            //socialButtonsPlacement: 'bottom',
            socialButtonsVariant: 'iconButton',
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <GlobalProvider>
            <App />
          </GlobalProvider>
        </QueryClientProvider>
      </ClerkProvider>
    </ExtendThemeProvider>
  </StrictMode>,
);
