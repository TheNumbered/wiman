import multer from 'multer';
import IssueReport from '../models/issue-report-model.js';

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

    // Log the ID and body for debugging purposes
    console.log(JSON.stringify(resolution_log));

    await IssueReport.addReviewToIssueReport(id, JSON.stringify(resolution_log));
    res.status(200).send({ message: `Review added to issue report with ID: ${id}` });
  } catch (err) {
    res.status(500).send({ message: err.message });
    console.error(err.message);
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
        image_url = `path/to/your/images/${req.file.filename}`;
      }

      let reported_by = 'some_user'; // Replace with actual logic if needed
      let room_id = building + room; // Concatenate building and room for room_id
      let issue_description = { report: description }; // Append image URL if available
      console.log(image_url);
      // Save the issue report
      await IssueReport.createIssueReport(room_id, reported_by, issue_description, image_url);

      res.status(201).send({ message: 'Issue report created' });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });
};

export const getBuildings = async (req, res) => {
  res.json(buildings);
};
