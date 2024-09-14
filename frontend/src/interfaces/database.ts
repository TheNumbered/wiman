export type Venue = {
    venueId: string;
    capacity: number;
    campusName: string;
    type: string;
    buildingName: string;
    amenities: string[];
    pictures: string[];
  }


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
}

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
}

export type Notifications = {
    notificationId: number;
    userId: string;
    code: string;
    message: string;
    date: Date | string;
    isRead: boolean;
}

export type Rooms = {
    roomId: string;
    buildingId: number;
    capacity: number;
    type: 'LECTURE' | 'TUTORIAL' | 'LAB' | 'MEETING';
    amenities: any;
}

export type Users = {
    id: number;
    name: string;
    email: string;
}

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
}

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
}

export type NotificationsInput = {
    notificationId?: number;
    userId: string;
    code: string;
    message: string;
    date: Date | string;
    isRead: boolean;
}

export type RoomsInput = {
    roomId?: string;
    buildingId: number;
    capacity: number;
    type: 'LECTURE' | 'TUTORIAL' | 'LAB' | 'MEETING';
    amenities: any;
}

export type UsersInput = {
    id?: number;
    name: string;
    email: string;
}
  

