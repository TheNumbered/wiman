import express from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import User from '../../models/user-model.js';
import * as UserController from '../user-controller.js';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.auth = {
    userId: 'test_user_id',
    claims: {
      userId: 'test_user_id',
      userFullName: 'Test User',
      userProfileUrl: 'http://profile.url/test',
    },
  };
  next();
});

app.get('/users', UserController.getUsers);
app.get('/user/role', UserController.getUserRole);
app.put('/user/:id/ban', UserController.toggleBanStatus);
app.put('/user/:id/role', UserController.updateUserRole);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('User Controller', () => {
  it('should fetch users excluding the current user', async () => {
    User.getUsersExceptCurrent = vi.fn().mockResolvedValue([
      { id: 'user1', fullName: 'User One' },
      { id: 'user2', fullName: 'User Two' },
    ]);

    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 'user1', fullName: 'User One' },
      { id: 'user2', fullName: 'User Two' },
    ]);
  });

  it('should fetch user role or create user if not found', async () => {
    User.getRole = vi.fn().mockResolvedValue(null);
    User.createUser = vi.fn().mockResolvedValue();

    const response = await request(app).get('/user/role');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ role: 'user' });

    expect(User.createUser).toHaveBeenCalledWith(
      'test_user_id',
      'Test User',
      'http://profile.url/test',
    );
  });

  it('should fetch existing user role', async () => {
    User.getRole = vi.fn().mockResolvedValue('admin');

    const response = await request(app).get('/user/role');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ role: 'admin' });
  });

  it('should toggle user ban status', async () => {
    User.toggleBanStatus = vi.fn().mockResolvedValue();

    const response = await request(app).put('/user/test_user_id/ban').send({ blocked: true });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'User banned status updated successfully' });

    expect(User.toggleBanStatus).toHaveBeenCalledWith('test_user_id', true);
  });

  it('should return 400 if role is missing when updating user role', async () => {
    const response = await request(app).put('/user/test_user_id/role').send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Missing role parameter' });
  });

  it('should update user role successfully', async () => {
    User.updateRole = vi.fn().mockResolvedValue();

    const response = await request(app).put('/user/test_user_id/role').send({ role: 'admin' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'User role updated successfully' });

    expect(User.updateRole).toHaveBeenCalledWith('test_user_id', 'admin');
  });

  it('should handle errors gracefully and return 500', async () => {
    User.getUsersExceptCurrent = vi.fn().mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/users');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Database error' });
  });
});
