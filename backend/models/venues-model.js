import axios from 'axios';
import db from '../config/db.js';
import { expandRepeats } from '../utils/expand-repeats.js';

// Mocked building information to use in case of an error
const mockBuildingInfo = {
  1: {
    campusName: 'West Campus',
    buildingName: 'Commerce, Law & Management',
    pictures: ['https://example.com/images/clm37_1.jpg', 'https://example.com/images/clm37_2.jpg'],
  },
  2: {
    campusName: 'East Campus',
    buildingName: 'Engineering Building',
    pictures: [
      'https://example.com/images/engg01_1.jpg',
      'https://example.com/images/engg01_2.jpg',
    ],
  },
};

class Venue {
  static async getFilteredVenue({ seatingCapacity, features, buildingName }) {
    // Step 1: Filter by capacity (if seatingCapacity is provided)
    const capacityQuery = seatingCapacity
      ? `SELECT * FROM rooms WHERE capacity >= ?;`
      : `SELECT * FROM rooms;`;

    const [rooms] = await db.query(capacityQuery, [seatingCapacity]);

    // Step 2: Filter by features
    const filteredRooms = rooms.filter((room) => {
      if (!features) return true;
      return features.every((feature) => room.amenities.includes(feature));
    });

    // Step 3: Filter by building name
    // Base URL and token from environment variables
    const API_BASE_URL = process.env.API_BASE_URL;
    const BEARER_TOKEN = process.env.BEARER_TOKEN;

    const fetchBuildingInfo = async (buildingId) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/buildings/${buildingId}`, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });

        return response.data;
      } catch (err) {
        return (
          mockBuildingInfo[buildingId] || {
            campusName: 'Unknown Campus',
            buildingName: 'Unknown Building',
            pictures: [],
          }
        );
      }
    };

    // Filter rooms by building name
    const filteredVenues = await Promise.all(
      filteredRooms.map(async (room) => {
        const buildingInfo = await fetchBuildingInfo(room.building_id);
        if (!buildingName || buildingInfo.buildingName === buildingName) {
          return {
            venueId: room.room_id,
            capacity: room.capacity,
            campusName: buildingInfo.campusName,
            type: room.type,
            buildingName: buildingInfo.buildingName,
            amenities: room.amenities,
            pictures: buildingInfo.pictures,
          };
        }
        return null;
      }),
    );

    return filteredVenues.filter((venue) => venue !== null);
  }

  static async getVenueReservations(venueId) {
    const query = `
      SELECT date, event_name, start_time, end_time, repeat_frequency, repeat_until
      FROM bookings
      WHERE venue_id = ?
      ORDER BY date, start_time;
    `;

    const [bookings] = await db.query(query, [venueId]);

    const reservations = {};

    bookings.forEach((booking) => {
      const { date, event_name, start_time, end_time, repeat_frequency, repeat_until } = booking;

      // Expand dates based on repeat frequency
      const repeatDates = expandRepeats(date, repeat_frequency, repeat_until);

      // For each date, add the booking entry
      repeatDates.forEach((repeatDate) => {
        const formattedTime = `${start_time}-${end_time}`;
        if (!reservations[repeatDate]) {
          reservations[repeatDate] = [];
        }
        reservations[repeatDate].push({
          event_name,
          time: formattedTime,
        });
      });
    });

    return reservations;
  }
}

//get reservations for a venue have status pending

export default Venue;
