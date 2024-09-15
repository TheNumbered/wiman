import db from '../config/db.js';
import { toCamelCase } from '../utils/case-converters.js';

class Notification {
  static async getNotificationsByUserId(user_id) {
    const [rows] = await db.query('SELECT * FROM notifications WHERE user_id = ?', [user_id]);
    return rows.map(toCamelCase);
  }

  static async createNotification(user_id, code, message) {
    const [result] = await db.query(
      'INSERT INTO notifications (user_id, code, message, date, is_read) VALUES (?, ?, ?, NOW(), FALSE)',
      [user_id, code, message],
    );
    return result.insertId; // Returns the newly created notification's ID
  }

  static async markAsRead(id) {
    const [result] = await db.query(
      'UPDATE notifications SET is_read = TRUE WHERE notification_id = ?',
      [id],
    );
    return result.affectedRows; // Returns the number of rows updated
  }
}

export default Notification;
