import express from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Booking from '../../models/bookings-model.js';
import * as BookingController from '../bookings-controller.js';

const app = express();
app.use(express.json());

// use req.auth.userId to get the user ID
app.use((req, res, next) => {
  req.auth = { userId: 'test_user_id' };
  next();
});
app.get('/bookings', BookingController.getAllBookings);
app.get('/user/bookings', BookingController.getUserBookings);
app.post('/bookings', BookingController.createBooking);
app.get('/bookings/:id/status', BookingController.getBookingStatus);
app.put('/bookings/:id/cancel', BookingController.cancelBooking);
app.put('/bookings/:id/confirm', BookingController.confirmBooking);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Booking Controller', () => {
  it('should fetch all bookings', async () => {
    Booking.getAllBookings = vi
      .fn()
      .mockResolvedValue([{ id: 1, eventName: 'Event 1', venueId: 'venue1', date: '2023-09-01' }]);

    const response = await request(app).get('/bookings');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, eventName: 'Event 1', venueId: 'venue1', date: '2023-09-01' },
    ]);
  });

  it('should fetch bookings for authenticated user', async () => {
    Booking.getBookingsByUserId = vi
      .fn()
      .mockResolvedValue([
        { id: 2, eventName: 'Active Event', venueId: 'venue2', date: '2023-10-01' },
      ]);

    const response = await request(app).get('/user/bookings');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 2, eventName: 'Active Event', venueId: 'venue2', date: '2023-10-01' },
    ]);
  });

  it('should create a new booking', async () => {
    Booking.createBooking = vi.fn().mockResolvedValue(1);

    const response = await request(app).post('/bookings').send({
      date: '2023-12-01',
      startTime: '10:00',
      endTime: '12:00',
      venueId: 'venue1',
      eventName: 'New Event',
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Booking created' });
  });

  it('should not create a booking with missing fields', async () => {
    const response = await request(app).post('/bookings').send({
      startTime: '10:00',
      endTime: '12:00',
      venueId: 'venue1',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Required fields are missing' });
  });

  it('should return booking status for valid booking ID', async () => {
    Booking.getBookingStatus = vi.fn().mockResolvedValue('confirmed');

    const response = await request(app).get('/bookings/1/status');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'confirmed' });
  });

  it('should return 404 for non-existing booking', async () => {
    Booking.getBookingStatus = vi.fn().mockResolvedValue(null);

    const response = await request(app).get('/bookings/999/status');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Booking not found' });
  });

  it('should cancel a booking', async () => {
    Booking.cancelBooking = vi.fn().mockResolvedValue(1);

    const response = await request(app)
      .put('/bookings/1/cancel')
      .send({ reasonForCancellation: 'Changed plans' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Booking cancelled' });
  });

  it('should not cancel booking with invalid ID', async () => {
    const response = await request(app)
      .put('/bookings/invalid/cancel')
      .send({ reasonForCancellation: 'Changed plans' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid booking ID' });
  });

  it('should confirm a booking', async () => {
    Booking.confirmBooking = vi.fn().mockResolvedValue(1);

    const response = await request(app).put('/bookings/1/confirm');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Booking confirmed' });
  });

  it('should not confirm booking with invalid ID', async () => {
    const response = await request(app).put('/bookings/invalid/confirm');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid booking ID' });
  });
});
