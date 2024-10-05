import axios from 'axios';
import fs from 'fs';
import path from 'path';

let backupBuildingData = [];
try {
  console.log('Reading backup-building-data.json file');
  backupBuildingData = JSON.parse(
    fs.readFileSync(path.resolve('./backup-building-data.json'), 'utf8'),
  );
} catch {
  console.log('Error reading backup-building-data.json file');
}

export const toCapitalizedWords = (str) => {
  return str
    .split('_') // Split by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(' '); // Join words with spaces
};

let cachedBuildingData = null;
let lastFetchTime = null;
const CACHE_DURATION = 60 * 60 * 1000; // Cache duration (1 hour)

// Fetch and cache building data in hashmap form
export const fetchBuildingData = async () => {
  const API_URL = 'https://witsgobackend.azurewebsites.net/v1/map/getBuildings';

  // Check if cached data exists and is still valid
  if (cachedBuildingData && Date.now() - lastFetchTime < CACHE_DURATION) {
    return cachedBuildingData;
  }

  try {
    const response = await axios.get(API_URL);
    if (response.data.data.success) {
      const buildingArray = response.data.data.data;

      cachedBuildingData = buildingArray.reduce((map, building) => {
        map[building.building_id] = {
          buildingName: building.building_name,
          campus: toCapitalizedWords(building.campus[0]),
          latitude: building.latitude,
          longitude: building.longitude,
        };
        return map;
      }, {});

      lastFetchTime = Date.now(); // Update the cache time
      return cachedBuildingData;
    } else {
      console.error('Error fetching building data:', response.data.data.message);
      //return [];
      return backupBuildingData;
    }
  } catch (error) {
    console.error('Error fetching building data:', error.message);
    //return [];
    return backupBuildingData;
  }
};
