import multer from 'multer';
// Configure multer storage
const storage = multer.memoryStorage(); // or use diskStorage if you want to save to disk
const upload = multer({ storage });

import IssueReport from '../models/issue-report-model.js';
import uploadToAzureBlob from '../services/upload-azure-blob.js';

export const getAllIssueReports = async (req, res) => {
  try {
    const issueReports = await IssueReport.getAllIssueReports();
    res.json(issueReports);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const getIssueReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const issueReport = await IssueReport.getIssueReportById(id);

    if (!issueReport) {
      return res.status(404).send({ error: `Issue report with ID: ${id} not found` });
    }

    res.json(issueReport);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const addReviewToIssueReportReview = async (req, res) => {
  try {
    // Extract the 'id' from the URL parameters
    const { id } = req.params;

    // Extract the review and issue_state from the request body
    const { review, issueState } = req.body;
    const target_issue_report = await IssueReport.getIssueReportById(id);

    // Check if the issue report exists
    if (!target_issue_report) {
      return res.status(404).send({ message: `Issue report with ID: ${id} not found` });
    }

    const resolutionLog = {
      'Problem Class': issueState,
      'Requirements To Fix': review,
      'Set Back': '',
    };

    await IssueReport.addReviewToIssueReport(id, JSON.stringify(resolutionLog));
    res.status(200).send({ message: `Review added to issue report with ID: ${id}` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const addIssueSetBackReport = async (req, res) => {
  try {
    // Extract the 'id' from the URL parameters
    const { id } = req.params;

    // Extract the review and issue_state from the request body
    const { setback, newFixRequirements } = req.body;
    const target_issue_report = await IssueReport.getIssueReportById(id);

    // Check if the issue report exists
    if (!target_issue_report) {
      return res.status(404).send({ message: `Issue report with ID: ${id} not found` });
    }
    const resolutionLog = {
      'Problem Class': JSON.parse(target_issue_report['resolutionLog'])['Problem Class'],
      'Requirements To Fix': newFixRequirements,
      'Set Back': setback,
    };
    await IssueReport.addReviewToIssueReport(id, JSON.stringify(resolutionLog));
    res
      .status(200)
      .send({ message: `Set Back successfuly reported to issue report with ID: ${id}` });
  } catch (err) {
    res.status(500).send({ message: err.message });
    // console.error(err.message);
  }
};

export const createIssueReport = async (req, res) => {
  // Use the upload.single middleware to handle the file upload and form data
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    try {
      const { venueId, description } = req.body;
      let image_url = null;
      if (req.file) {
        // Process the uploaded image file (e.g., save it to disk or cloud storage)
        // For now, assume you store the image file and get its URL.
        image_url = await uploadToAzureBlob(req.file);
      }

      let reported_by = req.auth?.userId;
      // Save the issue report
      await IssueReport.createIssueReport(venueId, reported_by, description, image_url);

      res.status(201).send({ message: 'Issue report created' });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });
};

export const closeIssueReport = async (req, res) => {
  try {
    const { id } = req.params;
    const target_issue_report = await IssueReport.getIssueReportById(id);

    // Check if the issue report exists
    if (!target_issue_report) {
      return res.status(404).send({ message: `Issue report with ID: ${id} not found` });
    }
    await IssueReport.addReviewToIssueReport(id, target_issue_report['resolutionLog'], 'Resolved');
    res.status(200).send({ message: `Successfully closed issue report with ID: ${id}` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
