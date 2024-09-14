import { KeyboardArrowLeftRounded } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import IssueReporting from './issue-reporting';
import SingleVenueDetails from './single-venue-details';

const VenueDetails = () => {
  return (
    <>
      <Box mb={2} sx={{ width: '100%', display: 'flex' }}>
        <KeyboardArrowLeftRounded />
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography>Venue Details</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ flex: '1' }}>
          <SingleVenueDetails />
        </Box>

        {/* ADDTIONAL INFO */}
        <Box
          pb={4}
          sx={{ border: '1px solid #eee', borderRadius: '1rem', margin: '1rem', flex: '1' }}
        >
          <IssueReporting />
        </Box>
      </Box>
    </>
  );
};

export default VenueDetails;
