import express from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Venue from '../../models/venues-model.js';
import * as VenueController from '../venues-controller.js';

const app = express();
app.use(express.json());

app.get('/venues', VenueController.getVenues);
app.get('/venues/:venueId/reservations', VenueController.getVenueReservations);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Venue Controller', () => {
  describe('getVenues', () => {
    it('should return filtered venues based on query parameters', async () => {
      const mockVenues = [
        { id: 1, seatingCapacity: 100, features: ['projector'], buildingName: 'Building A' },
        { id: 2, seatingCapacity: 200, features: ['wifi'], buildingName: 'Building B' },
      ];

      Venue.getFilteredVenue = vi.fn().mockResolvedValue(mockVenues);

      const response = await request(app).get('/venues').query({
        seatingCapacity: 150,
        features: 'wifi',
        buildingName: 'Building B',
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockVenues);

      expect(Venue.getFilteredVenue).toHaveBeenCalledWith({
        seatingCapacity: 150,
        features: ['wifi'],
        buildingName: 'Building B',
      });
    });

    it('should return venues without any filters if no query parameters are provided', async () => {
      const mockVenues = [
        { id: 1, seatingCapacity: 100, features: ['projector'], buildingName: 'Building A' },
        { id: 2, seatingCapacity: 200, features: ['wifi'], buildingName: 'Building B' },
      ];

      Venue.getFilteredVenue = vi.fn().mockResolvedValue(mockVenues);

      const response = await request(app).get('/venues');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockVenues);

      expect(Venue.getFilteredVenue).toHaveBeenCalledWith({
        seatingCapacity: undefined,
        features: undefined,
        buildingName: undefined,
      });
    });

    it('should handle errors and return a 500 status', async () => {
      Venue.getFilteredVenue = vi.fn().mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/venues');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Database error' });
    });
  });

  describe('getVenueReservations', () => {
    it('should return reservations for a specific venue', async () => {
      const mockReservations = [
        { id: 1, venueId: '1', startTime: '2023-09-20T10:00:00Z', endTime: '2023-09-20T12:00:00Z' },
        { id: 2, venueId: '1', startTime: '2023-09-21T14:00:00Z', endTime: '2023-09-21T16:00:00Z' },
      ];

      Venue.getVenueReservations = vi.fn().mockResolvedValue(mockReservations);

      const response = await request(app).get('/venues/1/reservations');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockReservations);
      expect(Venue.getVenueReservations).toHaveBeenCalledWith('1');
    });

    it('should handle errors and return a 500 status', async () => {
      Venue.getVenueReservations = vi.fn().mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/venues/1/reservations');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Database error' });
    });
  });
});
