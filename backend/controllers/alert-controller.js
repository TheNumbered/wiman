import Alert from '../models/alert-model.js';
import Venue from '../models/venue-model.js';

// Fetch all venues with their associated alerts
export const getVenuesWithAlerts = async (req, res) => {
  try {
    console.log('Fetching venues with alerts');
    const venuesWithAlerts = await Venue.getVenuesWithAlerts();
    console.log(venuesWithAlerts); // Log the venues with alerts
    res.json(venuesWithAlerts);
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ error: err.message });
  }
};

// Fetch alerts for a specific venue by venue ID
export const getAlertByVenue = async (req, res) => {
  try {
    const venueId = req.params.id; // Get the venue ID from the request parameters
    const alerts = await Alert.getAlertByVenue(venueId); // Fetch alerts using the venue ID
    console.log('Alerts for venue response:', alerts); // Log the response for debugging
    res.json(alerts); // Make sure to send valid JSON
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ error: err.message });
  }
};
