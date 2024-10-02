import db from '../config/db.js';
import { toCamelCase } from '../utils/case-converters.js';

class User {
  static async getUsersExceptCurrent(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE user_id != ?', [id]);
    return rows.map(toCamelCase);
  }

  static async toggleBanStatus(id, blocked) {
    await db.query('UPDATE users SET blocked = ? WHERE user_id = ?', [blocked, id]);
  }

  static async updateRole(id, role) {
    await db.query('UPDATE users SET role = ? WHERE user_id = ?', [role, id]);
  }

  static async createUser(id, fullName, profileUrl, role = 'user') {
    await db.query(
      'INSERT INTO users (user_id, full_name, profile_url, role) VALUES (?, ?, ?, ?)',
      [id, fullName, profileUrl, role],
    );
  }
  static async getRole(id) {
    const [rows] = await db.query('SELECT role, blocked FROM users WHERE user_id = ?', [id]);
    return toCamelCase(rows[0]);
  }

  static async clearHistory(userId) {
    const [result] = await db.query(
      `DELETE FROM bookings 
       WHERE user_id = ? 
       AND (status = 'cancelled' 
            OR (date < CURDATE() AND (status = 'pending' OR repeat_until IS NULL))
            OR (repeat_until < CURDATE()))`,
      [userId],
    );

    // Delete notifications for the user
    const [result2] = await db.query('DELETE FROM notifications WHERE user_id = ?', [userId]);
    return result.affectedRows + result2.affectedRows;
  }
}

export default User;
