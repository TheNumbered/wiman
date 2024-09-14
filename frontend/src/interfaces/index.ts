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

export interface Issue {
  issue_id: string;
  issue_description: string;
  room_id: string;
  status: string;
  reported_date: string;
}

export interface IssueReport {
  image_url: string;
  room_id: string;
  issue_description: string;
  status: 'Reported' | 'In Progress' | 'Resolved';
  resolution_log: string | null;
}
