import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../app.js';

describe('Express App', () => {
  it('should return a JSON response with a message', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello, world!' });
  });
});
