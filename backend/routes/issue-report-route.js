import express from 'express';
import {
  createIssueReport,
  getAllIssueReports,
  getIssueReportById,
  updateIssueReport,
} from '../controllers/issue-report-controller.js';

const router = express.Router();

// Define the routes
router.get('/issue-reports', getAllIssueReports);
router.get('/issue-reports/:id', getIssueReportById);
router.post('/issue-reports', createIssueReport);
router.put('/issue-reports/:id', updateIssueReport);

export default router;
