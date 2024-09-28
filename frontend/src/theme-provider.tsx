import { ThemeProvider } from '@emotion/react';
import { CssBaseline, GlobalStyles } from '@mui/material';

import React, { createContext, useEffect, useState } from 'react';
import theme from './theme';

type ColorMode = 'light' | 'dark';

interface ColorModeContextProps {
  colorMode: ColorMode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextProps>({
  colorMode: 'light',
  toggleColorMode: () => {},
});

export const useColorMode = () => {
  const context = React.useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
};

const ExtendThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorMode, setColorMode] = useState<ColorMode>('light');

  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    localStorage.setItem('color-mode', colorMode === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const savedColorMode = localStorage.getItem('color-mode') as ColorMode;
    setColorMode(savedColorMode || 'light');
  }, []);

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      <ThemeProvider theme={theme(colorMode)}>
        <GlobalStyles
          styles={{
            ul: { margin: 0, padding: 0, listStyle: 'none' },
            html: { WebkitFontSmoothing: 'auto' },
          }}
        />
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ExtendThemeProvider;
