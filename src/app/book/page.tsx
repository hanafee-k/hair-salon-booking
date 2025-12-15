"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import Link from "next/link";

export default function BookPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // เช็คว่าล็อกอินหรือยัง? ถ้ายังไม่ล็อกอิน ให้ไล่ไปหน้า Login
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // ถ้ายังไม่ล็อกอิน ให้ไปหน้า Login
        router.push("/login");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">กำลังตรวจสอบสิทธิ์...</p>
      </div>
    );
  }

  // ถ้ายังไม่ล็อกอิน (และกำลังจะเด้งไป) ไม่ต้องโชว์อะไร
  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          จองคิวตัดผม
        </h1>
        
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-800">
            สวัสดีคุณ <strong>{user.email}</strong> <br/>
            ระบบจองคิวกำลังอยู่ระหว่างการพัฒนา...
          </div>

          <div className="text-center">
            <Link 
              href="/" 
              className="inline-block bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3 px-6 rounded-lg transition-all"
            >
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}