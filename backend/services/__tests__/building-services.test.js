import axios from 'axios';
import fs from 'fs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchBuildingData } from '../building-service';

// Mock backup building data
const mockBackupData = [
  {
    building_id: '1',
    building_name: 'Backup Building',
    campus: ['backup campus'],
    latitude: 12.34,
    longitude: 56.78,
  },
];

// Mock API response
const mockAPIResponse = {
  data: {
    data: {
      success: true,
      data: [
        {
          building_id: '2',
          building_name: 'Main Building',
          campus: ['main campus'],
          latitude: 34.56,
          longitude: 78.9,
        },
      ],
    },
  },
};

vi.mock('axios');
vi.mock('fs');

describe('fetchBuildingData', () => {
  beforeEach(() => {
    // Clear the mocks before each test
    vi.clearAllMocks();
  });

  it('fetches and caches building data successfully', async () => {
    // Mock the API response
    axios.get.mockResolvedValue(mockAPIResponse);

    // Mock reading the backup file
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockBackupData));

    const data = await fetchBuildingData();

    expect(data).toEqual({
      2: {
        buildingName: 'Main Building',
        campus: 'Main campus',
        latitude: 34.56,
        longitude: 78.9,
      },
    });
    expect(axios.get).toHaveBeenCalledWith(
      'https://witsgobackend.azurewebsites.net/v1/map/getBuildings',
    );
  });
});
