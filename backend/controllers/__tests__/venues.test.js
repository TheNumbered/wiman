import express from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Venue from '../../models/venues-model.js';
import * as BuildingService from '../../services/building-service.js'; // Import the building service
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
        { id: 1, seatingCapacity: 100, building_id: '011673db', features: ['project'] },
        { id: 2, seatingCapacity: 200, building_id: '5519b211', features: ['wifi'] },
      ];

      const mockBuildingData = {
        '011673db': {
          buildingName: 'OLS',
          campus: 'east_campus',
          latitude: -26.1909492,
          longitude: 28.0287961,
        },
        '5519b211': {
          buildingName: 'Wits Science Stadium',
          campus: 'west_campus',
          latitude: -26.190634,
          longitude: 28.025348,
        },
      };

      // Mock the functions
      vi.spyOn(Venue, 'getFilteredVenue').mockResolvedValue(mockVenues);
      vi.spyOn(BuildingService, 'fetchBuildingData').mockResolvedValue(mockBuildingData); // Use spyOn for fetchBuildingData

      const response = await request(app).get('/venues').query({
        seatingCapacity: 150,
        features: 'wifi',
        buildingName: 'Wits Science Stadium',
      });
      expect(response.status).toBe(200);

      // Check if the combined venue and building data is correct
      expect(response.body).toEqual([
        {
          id: 2,
          seatingCapacity: 200,
          features: ['wifi'],
          buildingName: 'Wits Science Stadium',
          campusName: 'west_campus',
          location: {
            lat: -26.190634,
            lng: 28.025348,
          },
        },
      ]);

      expect(Venue.getFilteredVenue).toHaveBeenCalledWith({
        seatingCapacity: 150,
        features: ['wifi'],
      });

      expect(BuildingService.fetchBuildingData).toHaveBeenCalled(); // Ensure building data fetch is called
    });

    it('should return venues without any filters if no query parameters are provided', async () => {
      const mockVenues = [
        { id: 1, seatingCapacity: 100, building_id: '011673db', features: ['projector'] },
        { id: 2, seatingCapacity: 200, building_id: '5519b211', features: ['wifi'] },
      ];

      const mockBuildingData = {
        '011673db': {
          buildingName: 'OLS',
          campus: 'east_campus',
          latitude: -26.1909492,
          longitude: 28.0287961,
        },
        '5519b211': {
          buildingName: 'Wits Science Stadium',
          campus: 'west_campus',
          latitude: -26.190634,
          longitude: 28.025348,
        },
      };

      vi.spyOn(Venue, 'getFilteredVenue').mockResolvedValue(mockVenues);
      vi.spyOn(BuildingService, 'fetchBuildingData').mockResolvedValue(mockBuildingData); // Use spyOn for fetchBuildingData

      const response = await request(app).get('/venues');

      expect(response.status).toBe(200);

      // Check if the combined venue and building data is correct
      expect(response.body).toEqual([
        {
          id: 1,
          seatingCapacity: 100,
          features: ['projector'],
          buildingName: 'OLS',
          campusName: 'east_campus',
          location: {
            lat: -26.1909492,
            lng: 28.0287961,
          },
        },
        {
          id: 2,
          seatingCapacity: 200,
          features: ['wifi'],
          buildingName: 'Wits Science Stadium',
          campusName: 'west_campus',
          location: {
            lat: -26.190634,
            lng: 28.025348,
          },
        },
      ]);

      expect(Venue.getFilteredVenue).toHaveBeenCalledWith({
        seatingCapacity: undefined,
        features: undefined,
      });

      expect(BuildingService.fetchBuildingData).toHaveBeenCalled(); // Ensure building data fetch is called
    });

    it('should handle errors and return a 500 status', async () => {
      vi.spyOn(Venue, 'getFilteredVenue').mockRejectedValue(new Error('Database error'));

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

      vi.spyOn(Venue, 'getVenueReservations').mockResolvedValue(mockReservations);

      const response = await request(app).get('/venues/1/reservations');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockReservations);
      expect(Venue.getVenueReservations).toHaveBeenCalledWith('1');
    });

    it('should handle errors and return a 500 status', async () => {
      vi.spyOn(Venue, 'getVenueReservations').mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/venues/1/reservations');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Database error' });
    });
  });
});
