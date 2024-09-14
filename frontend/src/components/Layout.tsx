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
      <Box component={'section'} bgcolor={'background.paper'} px={4}>
        {<SideBar />}
      </Box>
      <Box component={'section'}>
        <Box ml={1} mr={6} py={4}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
