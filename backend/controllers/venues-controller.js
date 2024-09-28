import Venue from '../models/venues-model.js';
import { fetchBuildingData } from '../services/building-service.js';

export const getVenues = async (req, res) => {
  try {
    const { seatingCapacity, features, buildingName } = req.query;
    const featureArray = features ? features.split(',') : [];

    // Fetch building data (cached in a hashmap)
    const buildingDataMap = await fetchBuildingData();
    // Fetch and filter rooms based on seatingCapacity and features
    const venues = await Venue.getFilteredVenue({
      seatingCapacity: seatingCapacity ? parseInt(seatingCapacity, 10) : undefined,
      features: featureArray.length > 0 ? featureArray : undefined,
    });

    // Combine rooms with building data using the hashmap
    const combinedVenues = venues.map((venue) => {
      const buildingInfo = buildingDataMap[venue.building_id];
      return {
        ...venue,
        building_id: undefined,
        buildingName: buildingInfo?.buildingName || 'Unknown Building',
        campusName: buildingInfo?.campus || 'Unknown Campus',
        location: {
          lat: buildingInfo?.latitude || 0,
          lng: buildingInfo?.longitude || 0,
        },
      };
    });

    // Optionally filter the combined data by building name
    const filteredVenues = combinedVenues.filter((venue) => {
      if (!buildingName) return true;
      return venue.buildingName.toLowerCase().includes(buildingName.toLowerCase());
    });

    // Return the combined and filtered data
    res.json(filteredVenues);
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

export const updateVenue = async (req, res) => {
  const { id: venueId } = req.params;
  const { capacity, amenities, underMaintenance } = req.body;
  try {
    const updateData = {
      capacity,
      amenities: amenities ?? [],
      underMaintenance: underMaintenance === true || underMaintenance === 1,
    };

    const result = await Venue.updateRoom(venueId, updateData);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
