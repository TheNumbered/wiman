import express from 'express';
import {
  addIssueSetBackReport,
  addReviewToIssueReportReview,
  closeIssueReport,
  createIssueReport,
  getAllIssueReports,
  getIssueReportById,
} from '../controllers/issue-report-controller.js';
import { authRequest } from '../middleware/auth.js';

const router = express.Router();
router.use('/maintenance', authRequest);
router.get('/maintenance/issue-reports', getAllIssueReports);
router.get('/maintenance/issue-reports/:id', getIssueReportById);
router.post('/maintenance/issue-report', createIssueReport);
router.put('/maintenance/issue-report/:id/review', addReviewToIssueReportReview);
router.put('/maintenance/issue-report/:id/add-setback', addIssueSetBackReport);
router.put('/maintenance/issue-report/:id/close', closeIssueReport);

export default router;
