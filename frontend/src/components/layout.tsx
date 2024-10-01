import { Box } from '@mui/material';
import SideBar from './sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box component={'main'} sx={{ display: 'flex', maxWidth: '100vw', overflowX: 'hidden' }}>
      <Box
        component={'section'}
        bgcolor={'background.paper'}
        sx={{
          px: { xs: 0, md: 4 }, // Padding on x-axis
        }}
      >
        {<SideBar />}
      </Box>
      <Box
        component={'section'}
        bgcolor={'background.default'}
        sx={{
          width: '100%',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          ml: { md: 1 }, // Margin-left on medium screens and larger
          pr: { md: 2 }, // Padding-right on medium screens and larger
          py: { md: 4 }, // Padding-top and padding-bottom for small and medium screens
          pb: { xs: 8 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
