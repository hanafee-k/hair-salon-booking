"use client"; // 1. ต้องมีบรรทัดนี้เสมอถ้ามีการกดปุ่มหรือกรอกฟอร์ม

import { useState } from "react";
import Link from "next/link";
import { User, Lock } from "lucide-react";
import { useRouter } from "next/navigation"; // ตัวช่วยเปลี่ยนหน้า
import { supabase } from "@/utils/supabase"; // เรียกตัวเชื่อม Supabase
import "./login.css"; 

export default function LoginPage() {
  const router = useRouter();

  // 2. สร้างตัวแปรเก็บค่า Email และ Password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 3. ฟังก์ชัน Login (ทำงานตอนกดปุ่ม)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // ห้ามรีเฟรชหน้า
    setLoading(true);

    try {
      // ส่งข้อมูลไปเช็คกับ Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error; // ถ้ามี Error ให้กระโดดไปที่ catch
      }

      // ถ้าผ่าน -> เด้งไปหน้าแรก
      alert("เข้าสู่ระบบสำเร็จ!");
      router.push("/"); 
      router.refresh(); // รีโหลดให้ Navbar รู้ว่า Login แล้ว

    } catch (error: any) {
      alert("เข้าสู่ระบบไม่สำเร็จ: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">ยินดีต้อนรับกลับ</h1>
        <p className="login-subtitle">เข้าสู่ระบบเพื่อจัดการการจองของคุณ</p>

        {/* ผูกฟังก์ชัน handleLogin กับฟอร์ม */}
        <form onSubmit={handleLogin}>
          
          {/* ช่อง Username (แก้เป็น Email ตาม Supabase) */}
          <div className="form-group">
            <label className="form-label">อีเมล</label>
            <div className="input-wrapper">
              <User size={20} className="input-icon" />
              <input 
                type="email" 
                className="form-input" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // เก็บค่าที่พิมพ์ลงตัวแปร
                required
              />
            </div>
          </div>

          {/* ช่อง Password */}
          <div className="form-group">
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
               <label className="form-label">รหัสผ่าน</label>
            </div>
            
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input 
                type="password" 
                className="form-input" 
                placeholder="กรอกรหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // เก็บค่าที่พิมพ์ลงตัวแปร
                required
              />
            </div>
          </div>

          {/* ปุ่ม Login */}
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <div className="login-footer">
          ยังไม่เป็นสมาชิก?{" "}
          <Link href="/register" className="link-highlight">
            สมัครสมาชิกใหม่
          </Link>
        </div>
      </div>
    </div>
  );
}