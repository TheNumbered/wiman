import db from '../config/db.js';

class IssueReport {
  static async getAllIssueReports() {
    const [rows] = await db.query('SELECT * FROM issue_reports ORDER BY reported_date DESC');
    return rows;
  }

  static async getIssueReportById(id) {
    const [rows] = await db.query('SELECT * FROM issue_reports WHERE id = ?', [id]);
    return rows[0];
  }

  static async createIssueReport(title, description, status = 'Pending') {
    const [result] = await db.query(
      'INSERT INTO issue_reports (title, description, status) VALUES (?, ?, ?)',
      [title, description, status],
    );
    return result.insertId;
  }

  static async updateIssueReport(id, status) {
    const [result] = await db.query('UPDATE issue_reports SET status = ? WHERE id = ?', [
      status,
      id,
    ]);
    return result.affectedRows;
  }
}

export default IssueReport;
