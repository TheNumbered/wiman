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
    res.status(500).send(err.message);
  }
};

export const getVenueReservations = async (req, res) => {
  const { venueId } = req.params;

  try {
    const reservations = await Venue.getVenueReservations(venueId);
    res.json(reservations);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
