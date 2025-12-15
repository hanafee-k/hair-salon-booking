// src/types/index.ts

export type UserRole = 'customer' | 'barber' | 'admin';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Profile {
  id: string; // UUID จาก Supabase Auth
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  role: UserRole;
}

export interface Service {
  id: number;
  name: string;
  price: number;
  duration_min: number;
  category: string;
  image_url?: string;
}

export interface Booking {
  id: number;
  start_time: string; // ISO String
  end_time: string;   // ISO String
  total_price: number;
  status: BookingStatus;
  note?: string;
  // Relations (ใส่ ? เพราะบางทีเราอาจไม่ได้ query มา)
  barber?: Profile; 
  customer?: Profile;
  services?: Service[]; // สำหรับโชว์ว่าจองอะไรไปบ้าง
}