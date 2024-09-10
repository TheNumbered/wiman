import db from '../config/db.js';
import { toCamelCase } from '../utils/case-converters.js';

class Booking {
  // Get active bookings for a user
  static async getActiveBookingsByUserId(userId) {
    const [rows] = await db.query(
      'SELECT * FROM bookings WHERE user_id = ? AND status = "active" AND date >= CURDATE()',
      [userId],
    );
    return rows.map(toCamelCase);
  }

  // Get past bookings for a user
  static async getPastBookingsByUserId(userId) {
    const [rows] = await db.query(
      'SELECT * FROM bookings WHERE user_id = ? AND status = "inactive" OR (status = "active" AND date < CURDATE())',
      [userId],
    );
    return rows.map(toCamelCase);
  }

  // Create a new booking
  static async createBooking(userId, date, startTime, endTime, venueId, purpose) {
    const [result] = await db.query(
      'INSERT INTO bookings (user_id, date, start_time, end_time, venue_id, purpose, status) VALUES (?, ?, ?, ?, ?, ?, "active")',
      [userId, date, startTime, endTime, venueId, purpose],
    );
    return result.insertId; // Returns the newly created booking's ID
  }

  // Cancel a booking
  static async cancelBooking(id, reasonForCancellation) {
    const [result] = await db.query(
      'UPDATE bookings SET status = "cancelled", reason_for_cancellation = ? WHERE id = ?',
      [reasonForCancellation, id],
    );
    return result.affectedRows; // Returns the number of rows updated
  }

  // Delete a booking
  static async deleteBooking(id) {
    const [result] = await db.query('DELETE FROM bookings WHERE id = ?', [id]);
    return result.affectedRows; // Returns the number of rows deleted
  }
}

export default Booking;
