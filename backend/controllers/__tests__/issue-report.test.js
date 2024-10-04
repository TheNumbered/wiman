import express from 'express';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import IssueReport from '../../models/issue-report-model.js';
import * as IssueReportController from '../issue-report-controller.js';

const app = express();
app.use(express.json());

vi.mock('./push-notifications-controller.js', {
  onBookingCancelled: vi.fn(),
  onBookingConfirmed: vi.fn(),
  onIssueReportCreated: vi.fn(),
});

// Middleware to simulate authentication
app.use((req, res, next) => {
  req.auth = { userId: 'test_user' };
  next();
});

vi.mock('../services/upload-azure-blob.js', () =>
  vi.fn().mockResolvedValue('http://example.com/image.jpg'),
);

app.get('/api/issue-reports', IssueReportController.getAllIssueReports);
app.get('/api/issue-reports/:id', IssueReportController.getIssueReportById);
app.post('/api/venues/:venueId/create-issue', IssueReportController.createIssueReport);
app.put('/api/issue-reports/:id/review', IssueReportController.addReviewToIssueReportReview);
app.put('/api/issue-reports/:id/setback', IssueReportController.addIssueSetBackReport);
app.put('/api/issue-reports/:id/close', IssueReportController.closeIssueReport);

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  // Cleanup code if needed
});

vi.mock('../services/upload-azure-blob.js', () =>
  vi.fn().mockResolvedValue('http://example.com/image.jpg'),
);

describe('Issue Report Routes', () => {
  it('should get all issue reports', async () => {
    IssueReport.getAllIssueReports = vi
      .fn()
      .mockResolvedValue([
        { id: 1, room_id: 'room1', description: 'Issue description', image_url: null },
      ]);

    const response = await request(app).get('/api/issue-reports');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, room_id: 'room1', description: 'Issue description', image_url: null },
    ]);
  });

  it('should get issue report by ID', async () => {
    IssueReport.getIssueReportById = vi.fn().mockResolvedValue({
      id: 1,
      room_id: 'room1',
      description: 'Issue description',
      image_url: null,
    });

    const response = await request(app).get('/api/issue-reports/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      room_id: 'room1',
      description: 'Issue description',
      image_url: null,
    });
  });

  it('should handle issue report not found', async () => {
    IssueReport.getIssueReportById = vi.fn().mockResolvedValue(null);

    const response = await request(app).get('/api/issue-reports/999');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Issue report with ID: 999 not found' });
  });

  it('should add a review to an issue report', async () => {
    IssueReport.getIssueReportById = vi.fn().mockResolvedValue({ id: 1, resolutionLog: '{}' });
    IssueReport.addReviewToIssueReport = vi.fn().mockResolvedValue();

    const response = await request(app)
      .put('/api/issue-reports/1/review')
      .send({ review: 'Fixed', issueState: 'Resolved' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Review added to issue report with ID: 1' });
  });

  it('should handle error when adding review to non-existing issue report', async () => {
    IssueReport.getIssueReportById = vi.fn().mockResolvedValue(null);

    const response = await request(app)
      .put('/api/issue-reports/999/review')
      .send({ review: 'Fixed', issueState: 'Resolved' });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Issue report with ID: 999 not found' });
  });

  it('should handle server error when adding review', async () => {
    IssueReport.getIssueReportById = vi.fn().mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .put('/api/issue-reports/1/review')
      .send({ review: 'Fixed', issueState: 'Resolved' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Database error' });
  });

  it('should close an issue report', async () => {
    IssueReport.getIssueReportById = vi.fn().mockResolvedValue({ id: 1, resolutionLog: '{}' });
    IssueReport.addReviewToIssueReport = vi.fn().mockResolvedValue();

    const response = await request(app).put('/api/issue-reports/1/close');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Successfully closed issue report with ID: 1' });
  });

  it('should handle server errors when closing issue report', async () => {
    IssueReport.getIssueReportById = vi.fn().mockRejectedValue(new Error('Database error'));

    const response = await request(app).put('/api/issue-reports/1/close');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Database error' });
  });

  it('should create an issue report without an image', async () => {
    // Mock the model method (since there's no image)
    IssueReport.createIssueReport = vi.fn().mockResolvedValue();

    // Simulate a POST request without file upload
    const response = await request(app)
      .post('/api/venues/123/create-issue')
      .field('description', 'Broken window');

    // Ensure the createIssueReport method is called with null for image_url
    expect(IssueReport.createIssueReport).toHaveBeenCalledWith(
      '123', // venueId is passed
      'test_user', // Mocked user ID from the request
      'Broken window',
      'null', // No image uploaded
    );

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Issue report created' });
  });
});
