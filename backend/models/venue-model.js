import db from '../config/db.js';
import { toCamelCase } from '../utils/case-converters.js';

class Venue {
  static async getVenuesWithAlerts() {
    const query = `
      SELECT 
        v.venue_id, 
        v.venue_name, 
        v.location, 
        a.alert_id, 
        a.severity, 
        a.reason, 
        COALESCE(a.description, 'No description') AS description
      FROM 
        venues v
      LEFT JOIN 
        venue_alerts va ON va.venue_id = v.venue_id
      LEFT JOIN 
        alerts a ON a.alert_id = va.alert_id
      ORDER BY 
        v.venue_id;  -- Order by venue_id to group alerts by venue
    `;

    const [rows] = await db.query(query);
    return rows.map(toCamelCase);
  }
}

export default Venue;
