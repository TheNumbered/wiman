import express from 'express';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Notification from '../../models/notification-model.js';
import * as NotificationController from '../notification-controller.js';

const app = express();
app.use(express.json());

// use req.auth.userId to get the user ID
app.use((req, res, next) => {
  req.auth = { userId: 'test_user_id' };
  next();
});

app.get('/api/notifications', NotificationController.getNotifications);
app.put('/api/notifications/:id/read', NotificationController.markNotificationAsRead);

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {});

describe('Notification Routes', () => {
  it('should get notifications', async () => {
    Notification.getNotificationsByUserId = vi
      .fn()
      .mockResolvedValue([
        { id: 1, userId: 'test_user_id', code: 'code1', message: 'Message 1', isRead: false },
      ]);

    const response = await request(app).get('/api/notifications');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, userId: 'test_user_id', code: 'code1', message: 'Message 1', isRead: false },
    ]);
  });

  it('should mark a notification as read', async () => {
    // Mock the Notification model method
    Notification.markAsRead = vi.fn().mockResolvedValue(1);

    const response = await request(app).put('/api/notifications/1/read');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Notification marked as read' });
  });

  it('should handle marking a non-existing notification as read', async () => {
    Notification.markAsRead = vi.fn().mockResolvedValue(0); // Simulating that no record was updated

    const response = await request(app).put('/api/notifications/999/read');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Notification not found' });
  });

  it('should handle server errors when getting notifications', async () => {
    Notification.getNotificationsByUserId = vi.fn().mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/api/notifications');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Database error' });
  });

  it('should handle server errors when marking notification as read', async () => {
    Notification.markAsRead = vi.fn().mockRejectedValue(new Error('Database error'));

    const response = await request(app).put('/api/notifications/1/read');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Database error' });
  });
});
