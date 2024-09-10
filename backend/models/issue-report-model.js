import db from '../config/db.js';

class IssueReport {
  static async getAllIssueReports() {
    const [rows] = await db.query('SELECT * FROM maintenance ORDER BY reported_date DESC');
    return rows;
  }

  static async getIssueReportById(issue_id) {
    const [rows] = await db.query('SELECT * FROM maintenance WHERE issue_id = ?', issue_id);
    return rows;
  }

  static async createIssueReport(room_id, reported_by, issue_description, image_url) {
    const [result] = await db.query(
      'INSERT INTO maintenance (room_id, reported_by, issue_description, status, reported_date, image_url) VALUES (?, ?, ?, "Reported", NOW(), ?)',
      [room_id, reported_by, issue_description, image_url],
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
