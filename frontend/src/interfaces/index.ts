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

export interface MaintenanceIssue {
  issueDescription: string;
  maintenanceImageUrl: string; // updated field
  resolutionLog: string | null;
  amenities: string[];
  underMaintenance: number;
  capacity: number;
  venueId: string;
}

export interface IssueReport {
  imageUrl: string;
  venueId: string;
  issueDescription: string;
  status: 'Reported' | 'In Progress' | 'Resolved';
  resolutionLog: string | null;
}
