"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { Barber, Service, Booking, TimeSlot } from '@/types';
import { Calendar, Clock, User, Phone, Scissors, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function BookingPage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form state
  const [selectedBarber, setSelectedBarber] = useState<string>('');
  const [selectedService, setSelectedService] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');

  // Available time slots
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  // Fetch barbers and services on load
  useEffect(() => {
    fetchInitialData();
  }, []);

  // Generate time slots when barber and date are selected
  useEffect(() => {
    if (selectedBarber && selectedDate) {
      generateTimeSlots();
    }
  }, [selectedBarber, selectedDate]);

  const fetchInitialData = async () => {
    try {
      const [barbersRes, servicesRes] = await Promise.all([
        supabase.from('barbers').select('*').order('name'),
        supabase.from('services').select('*').order('id')
      ]);

      if (barbersRes.data) setBarbers(barbersRes.data);
      if (servicesRes.data) setServices(servicesRes.data);
      
      // Set default selections
      if (barbersRes.data && barbersRes.data.length > 0) {
        setSelectedBarber(barbersRes.data[0].id);
      }
      if (servicesRes.data && servicesRes.data.length > 0) {
        setSelectedService(servicesRes.data[0].id);
      }
      
      // Set default date to today
      const today = new Date().toISOString().split('T')[0];
      setSelectedDate(today);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('เกิดข้อผิดพลาดในการโหลดข้อมูล กรุณารีเฟรชหน้าใหม่');
    } finally {
      setLoading(false);
    }
  };

  const generateTimeSlots = async () => {
    // Generate slots from 9 AM to 6 PM (every 15 minutes)
    const slots: TimeSlot[] = [];
    const startHour = 9;
    const endHour = 18;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push({ time: timeString, available: true });
      }
    }

    // Fetch existing bookings for selected barber and date
    try {
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      const { data: bookings } = await supabase
        .from('bookings')
        .select('start_time, end_time')
        .eq('barber_id', selectedBarber)
        .gte('start_time', startOfDay.toISOString())
        .lte('start_time', endOfDay.toISOString());

      if (bookings && bookings.length > 0) {
        // Mark slots as unavailable if they overlap with existing bookings
        slots.forEach(slot => {
          const slotDateTime = new Date(`${selectedDate}T${slot.time}:00`);
          
          const isOverlapping = bookings.some(booking => {
            const bookingStart = new Date(booking.start_time);
            const bookingEnd = new Date(booking.end_time);
            return slotDateTime >= bookingStart && slotDateTime < bookingEnd;
          });

          if (isOverlapping) {
            slot.available = false;
          }
        });
      }

      setTimeSlots(slots);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setTimeSlots(slots);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!selectedBarber || !selectedService || !selectedDate || !selectedTime) {
      alert('กรุณากรอกข้อมูลการจองให้ครบถ้วน');
      return;
    }

    if (!userName.trim() || !userPhone.trim()) {
      alert('กรุณาระบุชื่อและเบอร์โทรศัพท์ของคุณ');
      return;
    }

    // Verify service exists
    const serviceExists = services.find(s => s.id === selectedService);
    if (!serviceExists) {
      alert('บริการที่เลือกไม่ถูกต้อง กรุณารีเฟรชและลองใหม่');
      return;
    }

    setSubmitting(true);

    try {
      // Calculate start and end times
      const startDateTime = new Date(`${selectedDate}T${selectedTime}:00`);
      const endDateTime = new Date(startDateTime.getTime() + serviceExists.duration * 60000);

      const bookingData: Booking = {
        barber_id: selectedBarber,
        service_id: selectedService,
        user_name: userName.trim(),
        user_phone: userPhone.trim(),
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString()
      };

      const { error } = await supabase.from('bookings').insert([bookingData]);

      if (error) throw error;

      // Success!
      setSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        setUserName('');
        setUserPhone('');
        setSelectedTime('');
        generateTimeSlots(); // Refresh slots
      }, 3000);

    } catch (error: any) {
      console.error('Booking error:', error);
      alert(error.message || 'ไม่สามารถจองคิวได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">กำลังโหลด...</div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md text-center shadow-2xl">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">จองคิวสำเร็จ!</h2>
          <p className="text-gray-600 mb-6">
            เราได้จองคิวให้คุณเรียบร้อยแล้ว แล้วพบกันนะคะ!
          </p>
          <Link 
            href="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            กลับสู่หน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-purple-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            กลับหน้าหลัก
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">จองคิวตัดผม</h1>
          <p className="text-purple-200">เลือกช่างที่คุณชอบ บริการที่ต้องการ และเวลาที่สะดวก</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 space-y-8">
          
          {/* Select Barber */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Scissors className="w-4 h-4" />
              เลือกช่างของคุณ
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              {barbers.map(barber => (
                <button
                  key={barber.id}
                  type="button"
                  onClick={() => setSelectedBarber(barber.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedBarber === barber.id
                      ? 'border-purple-600 bg-purple-50 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <img 
                    src={barber.image_url || ''} 
                    alt={barber.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-bold text-gray-900">{barber.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{barber.specialty}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Select Service */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Clock className="w-4 h-4" />
              เลือกบริการ
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              {services.map(service => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedService(service.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedService === service.id
                      ? 'border-purple-600 bg-purple-50 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <h3 className="font-bold text-gray-900 mb-1">{service.name}</h3>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{service.duration} นาที</span>
                    <span className="font-bold text-purple-600">฿{service.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Select Date */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Calendar className="w-4 h-4" />
              เลือกวันที่
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Select Time Slot */}
          {timeSlots.length > 0 && (
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Clock className="w-4 h-4" />
                ช่วงเวลาว่าง
              </label>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2 max-h-64 overflow-y-auto p-2">
                {timeSlots.map(slot => (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`p-3 rounded-lg font-medium text-sm transition-all ${
                      !slot.available
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : selectedTime === slot.time
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-purple-100 border border-gray-200'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customer Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <User className="w-4 h-4" />
                ชื่อของคุณ
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="สมชาย ใจดี"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Phone className="w-4 h-4" />
                เบอร์โทรศัพท์
              </label>
              <input
                type="tel"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                placeholder="081-234-5678"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting || !selectedTime}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'กำลังจอง...' : 'ยืนยันการจอง'}
          </button>
        </form>
      </div>
    </div>
  );
}