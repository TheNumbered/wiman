import db from '../config/db.js';
import { expandRepeats } from '../utils/expand-repeats.js';

class Venue {
  static async getFilteredVenue({ seatingCapacity, features }) {
    const capacityQuery = seatingCapacity
      ? `SELECT * FROM rooms WHERE capacity >= ?;`
      : `SELECT * FROM rooms;`;

    const [rooms] = await db.query(capacityQuery, [seatingCapacity]);

    // Filter rooms by features
    const filteredRooms = rooms.filter((room) => {
      if (!features) return true;
      return features.every((feature) => room.amenities.includes(feature));
    });

    // Return filtered room data
    return filteredRooms.map((room) => ({
      venueId: room.room_id,
      capacity: room.capacity,
      building_id: room.building_id, // Ensure building_id is included for combining later
      imageUrl: room.image_url,
      type: room.type,
      isUnderMaintenance: room.is_under_maintenance == 1,
      amenities: room.amenities,
    }));
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
