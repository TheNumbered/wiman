export type Bookings = {
  bookingId: number;
  userId: string;
  date: Date | string;
  startTime: any;
  endTime: any;
  venueId: string;
  status: 'pending' | 'cancelled' | 'confirmed';
  reasonForCancellation?: string;
  repeatFrequency: 'none' | 'daily' | 'weekly' | 'monthly';
  eventName: string;
  repeatUntil?: Date | string;
};

export type Maintenance = {
  issueId: number;
  venueId?: string;
  reportedBy?: string;
  issueDescription: string;
  reportedDate: Date | string;
  resolvedDate?: Date | string;
  resolutionLog: string;
  imageUrl?: string;
  status?: 'Reported';
};

export type Notifications = {
  notificationId: number;
  userId: string;
  message: string;
  date: Date | string;
  isRead: boolean;
  route?: string;
};

export type Rooms = {
  roomId: string;
  buildingId: number;
  capacity: number;
  type: 'LECTURE' | 'TUTORIAL' | 'LAB' | 'MEETING';
  amenities: any;
  imageUrl?: string;
  underMaintenance: boolean;
};

export type Users = {
  userId: string;
  fullName?: string;
  profileUrl?: string;
  role: 'user' | 'admin' | 'maintenance';
  blocked: boolean;
  createdAt: Date | string;
};

export type BookingsInput = {
  bookingId?: number;
  userId: string;
  date: Date | string;
  startTime: any;
  endTime: any;
  venueId: string;
  status: 'pending' | 'cancelled' | 'confirmed';
  reasonForCancellation?: string;
  repeatFrequency: 'none' | 'daily' | 'weekly' | 'monthly';
  eventName: string;
  repeatUntil?: Date | string;
};

export type MaintenanceInput = {
  issueId?: number;
  venueId?: string;
  reportedBy?: string;
  issueDescription: string;
  reportedDate: Date | string;
  resolvedDate?: Date | string;
  resolutionLog: string;
  imageUrl?: string;
  status?: 'Reported';
};

export type NotificationsInput = {
  notificationId?: number;
  userId: string;
  message: string;
  date: Date | string;
  isRead: boolean;
  route?: string;
};

export type RoomsInput = {
  roomId?: string;
  buildingId: number;
  capacity: number;
  type: 'LECTURE' | 'TUTORIAL' | 'LAB' | 'MEETING';
  amenities: any;
  imageUrl?: string;
  underMaintenance: boolean;
};

export type UsersInput = {
  userId?: string;
  fullName?: string;
  profileUrl?: string;
  role: 'user' | 'admin' | 'maintenance';
  blocked: boolean;
  createdAt: Date | string;
};
