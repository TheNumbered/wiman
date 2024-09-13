import { BlobServiceClient } from '@azure/storage-blob';
import dotenv from 'dotenv';
import multer from 'multer';
import process from 'process';
import IssueReport from '../models/issue-report-model.js';
dotenv.config({ path: '.env.local' });
// Sample data for testing, Please remove
const buildings = [
  {
    id: 'building1',
    name: 'Chemistry Building',
    rooms: [
      { id: 'room1', name: 'Room 1' },
      { id: 'room2', name: 'Room 2' },
    ],
  },
  {
    id: 'Law Building',
    name: 'Law Building',
    rooms: [
      { id: 'room3', name: 'Room 3' },
      { id: 'room4', name: 'Room 4' },
    ],
  },
  {
    id: 'MSL',
    name: 'MSL',
    rooms: [
      { id: 'Lab3', name: 'Lab3' },
      { id: 'room4', name: 'Room 4' },
    ],
  },
];

// Configure multer storage
const storage = multer.memoryStorage(); // or use diskStorage if you want to save to disk
const upload = multer({ storage });
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_BLOB_CONTAINER_NAME;

async function uploadToAzureBlob(file) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blobName = `${Date.now()}-${file.originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Upload file buffer to Azure Blob Storage
  await blockBlobClient.uploadData(file.buffer);

  // Return the URL of the uploaded image
  return blockBlobClient.url;
}

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
    res.json(issueReport);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const addReviewToIssueReportReview = async (req, res) => {
  try {
    // Extract the 'id' from the URL parameters
    const { id } = req.params;

    // Extract the review and issue_state from the request body
    const { review, issue_state } = req.body;
    const target_issue_report = await IssueReport.getIssueReportById(id);

    // Check if the issue report exists
    if (!target_issue_report) {
      return res.status(404).send({ message: `Issue report with ID: ${id} not found` });
    }

    const resolution_log = {
      'Problem Class': issue_state,
      'Requirements To Fix': review,
      'Set Back': '',
    };

    await IssueReport.addReviewToIssueReport(id, JSON.stringify(resolution_log));
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
    const { setback, new_fix_requirements } = req.body;
    const target_issue_report = await IssueReport.getIssueReportById(id);

    // Check if the issue report exists
    if (!target_issue_report) {
      return res.status(404).send({ message: `Issue report with ID: ${id} not found` });
    }
    const resolution_log = {
      'Problem Class': JSON.parse(target_issue_report[0]['resolution_log'])['Problem Class'],
      'Requirements To Fix': new_fix_requirements,
      'Set Back': setback,
    };
    await IssueReport.addReviewToIssueReport(id, JSON.stringify(resolution_log));
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
      const { building, room, description } = req.body;
      let image_url = null;
      if (req.file) {
        // Process the uploaded image file (e.g., save it to disk or cloud storage)
        // For now, assume you store the image file and get its URL.
        image_url = await uploadToAzureBlob(req.file);
      }

      let reported_by = 'some_user'; // Replace with getUserID
      let room_id = building + room; // Concatenate building and room for room_id
      // Save the issue report
      await IssueReport.createIssueReport(room_id, reported_by, description, image_url);

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
    await IssueReport.addReviewToIssueReport(
      id,
      target_issue_report[0]['resolution_log'],
      'Resolved',
    );
    res.status(200).send({ message: `Successfully closed issue report with ID: ${id}` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getBuildings = async (req, res) => {
  res.json(buildings);
};
