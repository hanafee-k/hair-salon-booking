"use client"; // ต้องใส่บรรทัดนี้เพื่อให้ใช้ useState ได้

import { useState } from "react";
import Link from "next/link";
import { User, Phone, Lock, Mail } from "lucide-react";
import { supabase } from "@/utils/supabase"; // เรียกตัวเชื่อมที่ทำไว้ในขั้นตอนที่ 2
import { useRouter } from "next/navigation"; // เอาไว้เด้งหน้า
import "./register.css"; 

export default function RegisterPage() {
  const router = useRouter();
  
  // 1. สร้างตัวแปรเก็บค่าที่กรอก
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); // Supabase เก็บใน Metadata ได้
  const [fullName, setFullName] = useState(""); // Supabase เก็บใน Metadata ได้
  const [loading, setLoading] = useState(false); // สถานะกำลังโหลด

  // 2. ฟังก์ชันกดปุ่มสมัคร
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // กันหน้าเว็บรีเฟรชเอง
    setLoading(true);

    try {
      // ส่งข้อมูลไปสมัครที่ Supabase
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
          },
        },
      });

      if (error) throw error;

      alert("สมัครสมาชิกสำเร็จ! กรุณาเช็คอีเมลเพื่อยืนยันตัวตน");
      router.push("/login"); // เด้งไปหน้า Login

    } catch (error: any) {
      alert("เกิดข้อผิดพลาด: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">สมัครสมาชิกใหม่</h1>
        <p className="register-subtitle">กรอกข้อมูลเพื่อเริ่มต้นใช้งาน</p>

        {/* เปลี่ยน div เป็น form เพื่อให้กด Enter ได้ */}
        <form onSubmit={handleRegister}>
          
          {/* ชื่อ-นามสกุล */}
          <div className="form-group">
            <label className="form-label">ชื่อ-นามสกุล</label>
            <div className="input-wrapper">
              <User size={20} className="input-icon" />
              <input 
                type="text" 
                className="form-input" 
                placeholder="เช่น สมชาย ใจดี"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* อีเมล (Supabase บังคับใช้อีเมลเป็นหลัก) */}
          <div className="form-group">
            <label className="form-label">อีเมล</label>
            <div className="input-wrapper">
              <Mail size={20} className="input-icon" />
              <input 
                type="email" 
                className="form-input" 
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* เบอร์โทร */}
          <div className="form-group">
            <label className="form-label">เบอร์โทรศัพท์</label>
            <div className="input-wrapper">
              <Phone size={20} className="input-icon" />
              <input 
                type="tel" 
                className="form-input" 
                placeholder="08x-xxx-xxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          
          {/* รหัสผ่าน */}
          <div className="form-group">
            <label className="form-label">รหัสผ่าน</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input 
                type="password" 
                className="form-input" 
                placeholder="กำหนดรหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* ปุ่มกด (เปลี่ยนข้อความตอนโหลด) */}
          <button type="submit" className="btn-register" disabled={loading}>
            {loading ? "กำลังสมัคร..." : "ยืนยันการสมัคร"}
          </button>
        </form>

        <div className="register-footer">
          มีบัญชีอยู่แล้ว?{" "}
          <Link href="/login" className="link-highlight">
            เข้าสู่ระบบที่นี่
          </Link>
        </div>
      </div>
    </div>
  );
}