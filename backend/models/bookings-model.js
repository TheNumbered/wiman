import db from '../config/db.js';

class Booking {
  static async getAllBookings() {
    const [rows] = await db.query('SELECT * FROM bookings');
    return rows;
  }

  static async createBooking(user_id, room_id, booking_date, start_time,  end_time, venue_code, event_name, category, event_date, frequency, repeat_until) {
    const [result] = await db.query('INSERT INTO bookings (user_id, room_id, booking_date, start_time,  end_time, venue_code, event_name, category, event_date, frequency, repeat_until) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [user_id, room_id, booking_date, start_time,  end_time, venue_code, event_name, category, event_date, frequency, repeat_until]);
    return result.insertId;
  }

  static async getBookingById(id) {
    const [rows] = await db.query('SELECT * FROM bookings WHERE booking_id = ?', [id]);
    return rows;
  }

  static async getBookingByUserId(user_id) {
    const [rows] = await db.query('SELECT * FROM bookings WHERE user_id = ?', [user_id]);
    return rows;
  }

  static async getBookingByRoomId(room_id) {
    const [rows] = await db.query('SELECT * FROM bookings WHERE room_id = ?', [room_id]);
    return rows;
  }

  static async deleteBookingById(id) {
    const [result] = await db.query('DELETE FROM bookings WHERE id = ?', [id]);
    return result.affectedRows;
  }

  static async getBookingByDate(booking_date) {
    const [rows] = await db.query('SELECT * FROM bookings WHERE booking_date = ?', [booking_date]);
    return rows;
  }
}

export default Booking;