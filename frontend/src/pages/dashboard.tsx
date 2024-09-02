import AsideNav from '@/components/aside-nav';
import { KeyboardArrowLeftRounded } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import IssueReporting from './issue-reporting';
import SingleVenueDetails from './single-venue-details';

const Dashboard = () => {
  return (
    <>
      <Box component={'main'} sx={{ display: 'flex' }}>
        <Box component={'section'} bgcolor={'background.paper'} px={4}>
          <AsideNav />
        </Box>
        <Box component={'section'} sx={{ background: '#fff' }}>
          <Box ml={1} mr={6} py={4}>
            <Box mb={2} sx={{ width: '100%', display: 'flex' }}>
              {/* <Typography><</Typography> */}
              <KeyboardArrowLeftRounded />
              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Typography>Venue Details</Typography>
              </Box>
            </Box>
            {/* DESKTOP SECTION */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {/* MAIN PAGE COMPONENT */}
              <SingleVenueDetails />
              {/* ADDTIONAL INFO */}
              <Box pb={4} sx={{ border: '1px solid #eee', borderRadius: '1rem', margin: '1rem' }}>
                <IssueReporting />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Dashboard;
