import Venue from '../models/venues-model.js';

export const getVenues = async (req, res) => {
  try {
    const venues = await Venue.getAllVenues();
    res.json(venues);
  } catch (err) {
    res.status(500).send(err.message);
  }
};