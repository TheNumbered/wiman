import axios from 'axios';
import process from 'process';
import db from '../config/db.js';
import { expandRepeats } from '../utils/expand-repeats.js';

// Mocked building information to use in case of an error
const mockBuildingInfo = {
  1: {
    campusName: 'West Campus',
    buildingName: 'Commerce, Law & Management',
    location: {
      lat: 37.7749,
      lng: -122.4194,
    },
  },
  2: {
    campusName: 'East Campus',
    buildingName: 'Engineering Building',
    location: {
      lat: 37.7749,
      lng: -122.4194,
    },
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
      } catch {
        return (
          mockBuildingInfo[buildingId] || {
            campusName: 'Unknown Campus',
            buildingName: 'Unknown Building',
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
            buildingName: buildingInfo.buildingName,
            imageUrl: room.image_url,
            type: room.type,
            isUnderMaintenance: room.is_under_maintenance == 1,
            amenities: room.amenities,
            location: buildingInfo.location,
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
      AND status = 'confirmed'
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

  static async updateRoom(roomId, updateData) {
    const { capacity, amenities, underMaintenance } = updateData;

    // Construct the update query
    const updateQuery = `
      UPDATE rooms 
      SET capacity = ?, 
          amenities = ?, 
          under_maintenance = ? 
      WHERE room_id = ?;
    `;
    try {
      const [result] = await db.query(updateQuery, [
        capacity,
        JSON.stringify(amenities),
        underMaintenance ? 1 : 0, // Convert boolean to tinyint
        roomId,
      ]);

      if (result.affectedRows === 0) {
        throw new Error('Room not found or no changes made');
      }

      return { message: 'Room updated successfully' };
    } catch (error) {
      throw new Error(`Failed to update room: ${error.message}`);
    }
  }
}
export default Venue;
