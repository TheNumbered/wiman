import SquareButton from '@/components/square-button';
import { AirplaneTicketRounded } from '@mui/icons-material';
import { Box, Button, Link, Typography } from '@mui/material';

const SingleVenueDetails = () => {
  return (
    <Box sx={{ maxWidth: '30rem', padding: '1rem' }}>
      <img
        src="https://wits100.wits.ac.za/media/wits-university/centenary/timeline/timeline%201983_1.JPG"
        alt=""
        style={{ width: '100%', borderRadius: '1rem', marginBottom: '1rem' }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ color: '#777' }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#000' }}>
            Wits Art Theatre
          </Typography>
          <Typography>East Campus, Braamfontein</Typography>
          <Box my={1}>
            <Typography>- Capacity</Typography>
            <Typography>- Available</Typography>
          </Box>
        </Box>
        <Box>
          <Button variant="contained" size="medium" color="secondary" sx={{ color: '#fff' }}>
            Book
          </Button>
        </Box>
      </Box>
      {/* First Row Of Cards */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
        <SquareButton
          icon={<AirplaneTicketRounded style={{ width: 24, height: 24, fill: '#79747E' }} />}
          title="lovely"
          subtitle="Home"
        />
        <SquareButton
          icon={<AirplaneTicketRounded style={{ width: 24, height: 24, fill: '#79747E' }} />}
          title=""
          subtitle="Home"
        />
        <SquareButton
          icon={<AirplaneTicketRounded style={{ width: 24, height: 24, fill: '#79747E' }} />}
          title=""
          subtitle="Home"
        />
      </Box>
      {/* First Row Of Cards */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
        <SquareButton
          icon={<AirplaneTicketRounded style={{ width: 24, height: 24, fill: '#79747E' }} />}
          title="lovely"
          subtitle="Home"
        />
        <SquareButton
          icon={<AirplaneTicketRounded style={{ width: 24, height: 24, fill: '#79747E' }} />}
          title=""
          subtitle="Home"
        />
        <SquareButton
          icon={<AirplaneTicketRounded style={{ width: 24, height: 24, fill: '#79747E' }} />}
          title=""
          subtitle="Home"
        />
      </Box>
      <Box mt={2}>
        <Link>Report a problem</Link>
      </Box>
    </Box>
  );
};
export default SingleVenueDetails;
