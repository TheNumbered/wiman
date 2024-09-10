// Define the Notification interface
export interface Notification {
  id: string;
  userId: string;
  code: string;
  message: string;
  date?: Date;
  isRead?: boolean;
}

export interface Booking {
  id: number;
  userId: string;
  date: string; // Date of the booking (YYYY-MM-DD)
  startTime: string; // Start time (HH:MM:SS)
  endTime: string; // End time (HH:MM:SS)
  venueId: number;
  status: 'active' | 'cancelled' | 'inactive'; // Booking status
  reasonForCancellation?: string;
  repeatFrequency?: 'none' | 'daily' | 'weekly' | 'monthly';
  purpose: string;
}
