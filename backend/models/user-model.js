import db from '../config/db.js';

class User {
  static async getUsersExceptCurrent(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id != ?', [id]);
    return rows;
  }

  static async toggleBanStatus(id, blocked) {
    await db.query('UPDATE users SET blocked = ? WHERE id = ?', [blocked, id]);
  }

  static async updateRole(id, role) {
    await db.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
  }
}

export default User;
