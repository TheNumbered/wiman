import IssueReport from '../models/issue-report-model.js';

export const getAllIssueReports = async (req, res) => {
  try {
    const issueReports = await IssueReport.getAllIssueReports();
    res.json(issueReports);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getIssueReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const issueReport = await IssueReport.getIssueReportById(id);
    if (!issueReport) {
      return res.status(404).json({ message: 'Issue report not found' });
    }
    res.json(issueReport);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const createIssueReport = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newIssueId = await IssueReport.createIssueReport(title, description);
    res.status(201).json({ message: 'Issue report created', id: newIssueId });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateIssueReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await IssueReport.updateIssueReport(id, status);
    if (result === 0) {
      return res.status(404).json({ message: 'Issue report not found' });
    }
    res.json({ message: 'Issue report updated' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
