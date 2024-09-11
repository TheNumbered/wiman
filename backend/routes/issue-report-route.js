import express from 'express';
import {
  addIssueSetBackReport,
  addReviewToIssueReportReview,
  createIssueReport,
  getAllIssueReports,
  getBuildings,
  getIssueReportById,
} from '../controllers/issue-report-controller.js';

const router = express.Router();

router.get('/issue-reports', getAllIssueReports);
router.get('/single-issue-report/:id', getIssueReportById);
router.post('/issue-report', createIssueReport);
router.put('/review-issue-report/:id', addReviewToIssueReportReview);
router.put('/add-issue-setback-report/:id', addIssueSetBackReport);
router.get('/buildings', getBuildings); ///TESTING PLEASE REMOVE

export default router;
