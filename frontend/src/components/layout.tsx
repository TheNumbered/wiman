import { Box } from '@mui/material';
import SideBar from './sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      component={'main'}
      sx={{ display: 'flex', maxWidth: '100vw', overflowX: 'hidden', background: '#fff' }}
    >
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
        sx={{
          background: '#fff',
          width: '-webkit-fill-available',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          ml: { md: 1 }, // Margin-left only on large screens and up
          pr: { md: 2 }, // Padding-right only on large screens and up
          py: { md: 4 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
