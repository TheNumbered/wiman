// Define the Notification interface
export interface Notification {
  id: string;
  userId: string;
  code: string;
  message: string;
  date?: Date;
  isRead?: boolean;
}
