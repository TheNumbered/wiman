import db from '../config/db.js';
import { toCamelCase } from '../utils/case-converters.js';

class Booking {
  // Get all bookings
  static async getAllBookings() {
    const [rows] = await db.query('SELECT * FROM bookings');
    return rows.map(toCamelCase);
  }

  static async getBookingById(id) {
    const [rows] = await db.query('SELECT * FROM bookings WHERE booking_id = ?', [id]);
    return toCamelCase(rows[0]);
  }

  // Get active bookings for a user
  static async getBookingsByUserId(userId) {
    const [rows] = await db.query(
      'SELECT * FROM bookings WHERE user_id = ?',
      //'SELECT * FROM bookings WHERE user_id = ? AND NOT (status = "cancelled" AND reason_for_cancellation IS NULL)',
      [userId],
    );
    return rows.map(toCamelCase);
  }

  // Create a new booking
  static async createBooking(
    userId,
    date,
    startTime,
    endTime,
    venueId,
    eventName,
    repeatFrequency,
    repeatUntil,
    nextReminder,
    status = 'pending',
  ) {
    const [result] = await db.query(
      `INSERT INTO bookings (user_id, date, start_time, end_time, venue_id, event_name, repeat_frequency, repeat_until, next_reminder, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        date,
        startTime,
        endTime,
        venueId,
        eventName,
        repeatFrequency,
        repeatUntil,
        nextReminder,
        status,
      ],
    );
    return result.insertId; // Returns the newly created booking's ID
  }

  // Cancel a booking
  static async cancelBooking(id, reasonForCancellation) {
    const [result] = await db.query(
      `UPDATE bookings 
       SET status = 'cancelled', reason_for_cancellation = ? 
       WHERE booking_id = ? AND status != 'cancelled'`,
      [reasonForCancellation, id],
    );
    return result.affectedRows; // Returns the number of rows updated
  }

  // Booking Status
  static async getBookingStatus(id) {
    const [rows] = await db.query('SELECT status FROM bookings WHERE booking_id = ?', [id]);
    return rows[0].status;
  }

  // Confirm a booking
  static async confirmBooking(id) {
    const [result] = await db.query(
      `UPDATE bookings 
       SET status = 'confirmed' 
       WHERE booking_id = ? AND status = 'pending'`,
      [id],
    );
    return result.affectedRows; // Returns the number of rows updated
  }

  // Get bookings due for reminder
  static async getBookingsDueForReminder(currentTime) {
    const query = `
      SELECT * FROM bookings
      WHERE status = 'confirmed'
        AND next_reminder IS NOT NULL
        AND next_reminder <= ?
    `;
    const [rows] = await db.execute(query, [currentTime]);
    return rows.map(toCamelCase);
  }

  // Update the next reminder for a booking
  static async updateNextReminder(bookingId, nextReminder) {
    const query = `
      UPDATE bookings
      SET next_reminder = ?
      WHERE booking_id = ?
    `;
    await db.execute(query, [nextReminder, bookingId]);
  }
}

export default Booking;
