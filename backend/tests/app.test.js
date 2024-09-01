import process from 'process';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import app from '../app.js';

// Mock @clerk/clerk-sdk-node module
vi.mock('@clerk/clerk-sdk-node', () => ({
  ClerkExpressRequireAuth: () => (req, res, next) => {
    res.status(500).json({ message: 'Unauthenticated', code: 'INTERNAL_SERVER_ERROR' });
    next();
  },
}));

describe('Express App', () => {
  const mockApiKey = 'mocked_api_key';

  beforeEach(() => {
    process.env.API_KEY = mockApiKey; // Mock the API key environment variable
  });

  afterEach(() => {
    delete process.env.API_KEY;
    vi.resetModules();
  });

  it('should return a JSON response with a message when API key is valid', async () => {
    const response = await request(app).get('/').set('Authorization', `Bearer ${mockApiKey}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello, world!' });
  });

  it('should return a 500 error when API key is invalid', async () => {
    const response = await request(app).get('/').set('Authorization', 'Bearer invalid_api_key');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Unauthenticated', code: 'INTERNAL_SERVER_ERROR' });
  });
});
