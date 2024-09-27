import Venue from '../models/venues-model.js';

export const getVenues = async (req, res) => {
  try {
    const { seatingCapacity, features, buildingName } = req.query;
    const featureArray = features ? features.split(',') : [];

    const venues = await Venue.getFilteredVenue({
      seatingCapacity: seatingCapacity ? parseInt(seatingCapacity, 10) : undefined,
      features: featureArray.length > 0 ? featureArray : undefined,
      buildingName: buildingName || undefined,
    });

    // Return the filtered venues
    res.json(venues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVenueReservations = async (req, res) => {
  const { venueId } = req.params;

  try {
    const reservations = await Venue.getVenueReservations(venueId);
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateIssueReport = async (req, res) => {
  const { id } = req.params;
  const { resolutionLog, status } = req.body;

  try {
    const affectedRows = await IssueReport.addReviewToIssueReport(id, resolutionLog, status);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Issue not found or no changes made' });
    }
    res.json({ message: 'Issue updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
