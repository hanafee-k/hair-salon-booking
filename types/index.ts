export interface Barber {
  id: string;
  name: string;
  image_url: string | null;
  specialty: string | null;
  created_at?: string;
}

export interface Service {
  id: number;
  name: string;
  duration: number; // in minutes
  price: number;
  created_at?: string;
}

export interface Booking {
  id?: string;
  barber_id: string;
  service_id: number;
  user_name: string;
  user_phone: string;
  start_time: string; // ISO 8601 format
  end_time: string; // ISO 8601 format
  created_at?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}