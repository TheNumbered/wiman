import express from 'express';
import {
  addIssueSetBackReport,
  addReviewToIssueReportReview,
  closeIssueReport,
  createIssueReport,
  getAllIssueReports,
  getIssueReportById,
} from '../controllers/issue-report-controller.js';

const router = express.Router();

router.get('/issue-reports', getAllIssueReports);
router.get('/single-issue-report/:id', getIssueReportById);
router.post('/issue-report', createIssueReport);
router.put('/review-issue-report/:id', addReviewToIssueReportReview);
router.put('/add-issue-setback-report/:id', addIssueSetBackReport);
router.put('/close-issue-report/:id', closeIssueReport);

export default router;
