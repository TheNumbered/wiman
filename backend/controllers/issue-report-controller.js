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
  console.log(req.body);

  // Use the upload.array middleware to handle multiple file uploads (max 5 files)
  upload.array('images', 5)(req, res, async (err) => {
    if (err) {
      // console.log(err);
      return res.status(500).send(err.message);
    }

    try {
      const { venueId, description } = req.body;
      let reported_by = req.auth?.userId; // Assuming you are using some form of auth to get the user ID

      let image_urls = null;
      // Process uploaded files (if any)
      if (req.files && req.files.length > 0) {
        image_urls = [];
        // Loop over each uploaded file and process it (e.g., upload to Azure Blob)
        for (const file of req.files) {
          const imageUrl = await uploadToAzureBlob(file); // Upload to Azure Blob (or any storage service)
          image_urls.push(imageUrl); // Store the uploaded image URL
        }
      }
      // console.log(reported_by, image_urls, description, venueId);
      // Save the issue report with the associated image URLs
      await IssueReport.createIssueReport(
        venueId,
        reported_by,
        description,
        JSON.stringify(image_urls),
      );

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

export const getIssuesInProgress = async (req, res) => {
  try {
    const issuesInProgress = await IssueReport.getIssuesInProgress();
    res.json(issuesInProgress);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
