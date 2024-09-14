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

export type Maintenance = {
  issueId: number;
  roomId?: string;
  reportedBy?: number;
  issueDescription: string;
  status: 'Reported';
  reportedDate: Date | string;
  resolvedDate?: Date | string;
  resolutionLog: string;
  imageUrl?: string;
};

export type Notifications = {
  notificationId: number;
  userId: string;
  code: string;
  message: string;
  date: Date | string;
  isRead: boolean;
};

export type Users = {
  id: number;
  name: string;
  email: string;
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

export type MaintenanceInput = {
  issueId?: number;
  roomId?: string;
  reportedBy?: number;
  issueDescription: string;
  status: 'Reported';
  reportedDate: Date | string;
  resolvedDate?: Date | string;
  resolutionLog: string;
  imageUrl?: string;
};

export type NotificationsInput = {
  notificationId?: number;
  userId: string;
  code: string;
  message: string;
  date: Date | string;
  isRead: boolean;
};

export type UsersInput = {
  id?: number;
  name: string;
  email: string;
};
