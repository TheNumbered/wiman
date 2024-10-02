import express from 'express';
import {
  addIssueSetBackReport,
  addReviewToIssueReportReview,
  closeIssueReport,
  getAllIssueReports,
  getIssueReportById,
} from '../controllers/issue-report-controller.js';
import { authMaintenance } from '../middleware/auth.js';

const router = express.Router();
router.use('/maintenance', authMaintenance);
router.get('/maintenance/issue-reports', getAllIssueReports);
router.get('/maintenance/issue-reports/:id', getIssueReportById);
router.put('/maintenance/issue-report/:id/review', addReviewToIssueReportReview);
router.put('/maintenance/issue-report/:id/add-setback', addIssueSetBackReport);
router.put('/maintenance/issue-report/:id/close', closeIssueReport);

export default router;
