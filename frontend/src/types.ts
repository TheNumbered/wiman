export interface Room {
    room_id: number;
    building_name: string;
    venue_code: string;
    venue_size: number;
    type: 'LECTURE' | 'TUTORIAL' | 'LAB' | 'MEETING';
    location: string;
    amenities: string[];
    pictures: string[];
}
export interface Venue {
    room_id: number;
    building_name: string;
    venue_code: string;
    venue_size: number;
    type: string;
    location: string;
    amenities: string[];
    pictures: string[];
  }