export * from './database';

export interface Venue {
  venueId: string;
  capacity: number;
  campusName: string;
  type: string;
  buildingName: string;
  amenities: string[];
  imageUrl?: string;
  status: 'AVAILABLE' | 'UNDER-MANTAINANCE';
  location: {
    lat: number;
    lng: number;
  };
}

// export interface Issue {
//   issue_id: string;
//   issue_description: string;
//   room_id: string;
//   status: string;
//   reported_date: string;
// }

export interface IssueReport {
  imageUrl: string;
  venueId: string;
  issueDescription: string;
  status: 'Reported' | 'In Progress' | 'Resolved';
  resolutionLog: string | null;
}
