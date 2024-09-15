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
    const [rows] = await db.query('SELECT role FROM users WHERE user_id = ?', [id]);
    return rows.length > 0 ? rows[0].role : null;
  }
}

export default User;
