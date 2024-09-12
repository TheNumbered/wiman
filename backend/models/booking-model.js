// models/booking-model.js
import db from '../config/db.js';

class Booking {
  // Fetch all bookings
  static async getAllBookings() {
    try {
      const [rows] = await db.query('SELECT * FROM bookings');
      return rows;
    } catch (error) {
      console.error('Error fetching all bookings:', error);
      throw error;
    }
  }

  // Cancel a booking by setting its status to 'cancelled' and updating the reason
  static async cancelBooking(id, reasonForCancellation) {
    try {
      const [result] = await db.query(
        'UPDATE bookings SET status = ?, reasonForCancellation = ? WHERE id = ?',
        ['cancelled', reasonForCancellation, id],
      );

      if (result.affectedRows === 0) {
        throw new Error('Booking not found');
      }
    } catch (error) {
      console.error('Error in cancelBooking method:', error);
      throw error; // Re-throw the error to be caught by the controller
    }
  }

  // Update booking status from 'active' to 'inactive'
  static async updateBookingStatus(id, status) {
    try {
      const [result] = await db.query('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);
      if (result.affectedRows === 0) {
        throw new Error('Booking not found');
      }
    } catch (error) {
      console.error('Error in updateBookingStatus method:', error);
      throw error; // Re-throw the error to be caught by the controller
    }
  }

  // Find booking by ID
  static async findById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM bookings WHERE id = ?', [id]);
      return rows[0]; // Return the first row
    } catch (error) {
      console.error('Error finding booking by ID:', error);
      throw error;
    }
  }
}

export default Booking;
