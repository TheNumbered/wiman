export * from './database';

export interface Venue {
  venueId: string;
  capacity: number;
  campusName: string;
  type: string;
  buildingName: string;
  amenities: string[];
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
