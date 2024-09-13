export * from './database';

export interface Venue {
  venueId: number;
  capacity: number;
  code: string;
  campus: string;
  type: string;
  name: string;
  amenities: string[];
  location: {
    lat: number;
    lng: number;
  };
  pictures: string[];
}
