import db from '../config/db.js';

class User {
  static async getAllUsers() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  }

  static async createUser(name, email) {
    const [result] = await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    return result.insertId;
  }
}

export default User;
