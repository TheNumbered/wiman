import { Box, useMediaQuery, useTheme } from '@mui/material';
import React, { ReactNode } from 'react';
import Sidebar from './sidebar';

interface LayoutProps {
    children: ReactNode;
    hasSearch?: boolean;
}

// Functional component Layout with proper typing
const Layout: React.FC<LayoutProps> = ({ children, hasSearch = true }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is mobile

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    mt: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: { xs: 0, md: 5 }, // Apply margin only on md (desktop) and above
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
