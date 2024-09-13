export type Bookings = {
  bookingId: number;
  userId: string;
  date: Date | string;
  startTime: any;
  endTime: any;
  venueId: number;
  status: 'pending' | 'cancelled' | 'confirmed';
  reasonForCancellation?: string;
  repeatFrequency: 'none' | 'daily' | 'weekly' | 'monthly';
  eventName: string;
  repeatUntil?: Date | string;
};

export type BookingsInput = {
  bookingId?: number;
  userId: string;
  date: Date | string;
  startTime: any;
  endTime: any;
  venueId: number;
  status: 'pending' | 'cancelled' | 'confirmed';
  reasonForCancellation?: string;
  repeatFrequency: 'none' | 'daily' | 'weekly' | 'monthly';
  eventName: string;
  repeatUntil?: Date | string;
};
