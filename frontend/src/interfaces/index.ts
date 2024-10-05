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
  isUnderMaintenance: any;
}

export interface AdvancedIssue {
  issueId: string;
  issueDescription: string;
  issueImages: any;
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

export interface SecurityReport {
  uid: string;
  reportID: number;
  removed: boolean;
  geoLocation: string; // as "-26.1873281, 27.9856566"
  description: string;
  location: string;
  urgencyLevel: string;
  status: string;
  timestamp: { _seconds: number; _nanoseconds: number };
  imageUrls: any;
}
