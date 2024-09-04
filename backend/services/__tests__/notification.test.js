import * as OneSignal from '@onesignal/node-onesignal';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import NotificationService from '../notification.js';

vi.mock('@onesignal/node-onesignal', () => {
  const createNotificationMock = vi.fn();
  return {
    createConfiguration: vi.fn(() => ({})),
    DefaultApi: vi.fn(() => ({
      createNotification: createNotificationMock,
    })),
    Notification: vi.fn(() => ({})),
  };
});

describe('NotificationService', () => {
  let notificationService;
  let createNotificationMock;

  beforeEach(() => {
    createNotificationMock = vi.fn();
    OneSignal.DefaultApi.mockImplementation(() => ({
      createNotification: createNotificationMock,
    }));
    notificationService = new NotificationService();
  });

  it('should initialize with correct configuration', () => {
    expect(notificationService).toBeInstanceOf(NotificationService);
    expect(notificationService.appId).toBe('89ba3c7e-11bc-49ed-930c-77f511646f58');
  });

  it('should send notification with correct parameters', async () => {
    const heading = 'Test Heading';
    const content = 'Test Content';
    const userIds = ['user1', 'user2'];
    const filters = [{ field: 'tag', key: 'role', relation: '=', value: 'user' }];

    // Mock the `createNotification` method to return a resolved promise with 'response data'
    createNotificationMock.mockResolvedValue('response data');

    // Call sendNotification
    const response = await notificationService.sendNotification({
      heading,
      content,
      userIds,
      filters,
    });

    // Verify that `createNotification` was called with the correct parameters
    expect(createNotificationMock).toHaveBeenCalledWith(
      expect.objectContaining({
        app_id: notificationService.appId,
        contents: { en: content },
        headings: { en: heading },
        included_segments: ['All'],
        include_aliases: { external_id: userIds },
        filters: filters,
      }),
    );

    // Verify that the response matches the expected mock value
    expect(response).toBe('response data');
  });

  it('should handle errors from createNotification', async () => {
    const heading = 'Test Heading';
    const content = 'Test Content';
    const userIds = ['user1', 'user2'];
    const filters = [{ field: 'tag', key: 'role', relation: '=', value: 'user' }];

    // Mock the `createNotification` method to return a rejected promise
    const error = new Error('Test error');
    createNotificationMock.mockRejectedValue(error);

    // Call sendNotification and expect it to handle the error
    const response = await notificationService.sendNotification({
      heading,
      content,
      userIds,
      filters,
    });

    // Verify that `createNotification` was called with the correct parameters
    expect(createNotificationMock).toHaveBeenCalledWith(
      expect.objectContaining({
        app_id: notificationService.appId,
        contents: { en: content },
        headings: { en: heading },
        included_segments: ['All'],
        include_aliases: { external_id: userIds },
        filters: filters,
      }),
    );

    // Verify that the response is undefined or handles error as expected
    expect(response).toBeUndefined(); // Adjust based on your error handling logic
  });
});
