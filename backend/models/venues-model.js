import db from '../config/db.js';

class Venue {
  static async getAllVenues() {
    const [rows] = await db.query('SELECT * FROM rooms');
    return rows;
  }
}

export default Venue;