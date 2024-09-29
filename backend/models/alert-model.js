import db from '../config/db.js';
import { toCamelCase } from '../utils/case-converters.js';

class Alert {
  // Fetch all alerts (Optional if needed elsewhere)
  static async getAllAlerts() {
    const [rows] = await db.query('SELECT * FROM alerts');
    return rows.map(toCamelCase);
  }

  // Fetch alerts by venue id and for today or campus-wide alerts
  static async getAlertByVenue(venueId) {
    const query = `
      SELECT 
        v.venue_name,
        v.location,
        a.severity,
        a.reason,
        COALESCE(a.description, 'No description') AS description,
        va.created_at
      FROM 
        venue_alerts va
      JOIN 
        venues v ON va.venue_id = v.venue_id
      JOIN 
        alerts a ON va.alert_id = a.alert_id
      WHERE 
        (va.venue_id = ? AND DATE(va.created_at) = CURDATE())
        OR a.is_campus_wide = TRUE
      ORDER BY 
        va.created_at DESC;
    `;
    const [rows] = await db.query(query, [venueId]);
    return rows.map((row) => {
      return {
        venueName: row.venue_name,
        severity: row.severity,
        reason: row.reason,
        description: row.description,
      };
    });
  }
}

export default Alert;
