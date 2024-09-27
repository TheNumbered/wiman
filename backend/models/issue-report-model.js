import db from '../config/db.js';
import { toCamelCase } from '../utils/case-converters.js';

class IssueReport {
  static async getAllIssueReports() {
    const [rows] = await db.query('SELECT * FROM maintenance ORDER BY reported_date DESC');
    return rows.map(toCamelCase);
  }

  static async getIssueReportById(issue_id) {
    const [rows] = await db.query('SELECT * FROM maintenance WHERE issue_id = ?', issue_id);
    return toCamelCase(rows[0]);
  }

  static async createIssueReport(venue_id, reported_by, issue_description, image_url) {
    const [result] = await db.query(
      'INSERT INTO maintenance (venue_id, reported_by, issue_description, status, reported_date, image_url) VALUES (?, ?, ?, "Reported", NOW(), ?)',
      [venue_id, reported_by, issue_description, image_url],
    );
    return result.insertId;
  }

  static async addReviewToIssueReport(issue_id, resolution_log, status = 'In Progress') {
    const [result] = await db.query(
      'UPDATE maintenance set resolution_log = ?, status = ? WHERE issue_id= ?',
      [resolution_log, status, issue_id],
    );
    return result.insertId;
  }
}

export default IssueReport;
