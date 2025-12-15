"use client"; // 1. ต้องใส่บรรทัดนี้ เพราะมีการดึงข้อมูล User และกดปุ่ม Logout

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase"; 
import { User, LogOut } from "lucide-react"; // เพิ่มไอคอน Logout
import "./Navbar.css"; 

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null); // ตัวแปรเก็บข้อมูลคนล็อกอิน

  // 2. ตรวจสอบว่ามีคนล็อกอินอยู่ไหม (ทำครั้งแรกที่โหลดหน้าเว็บ)
  useEffect(() => {
    const getUser = async () => {
      // ดึงข้อมูล session ปัจจุบัน
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getUser();

    // ฟังเหตุการณ์: ถ้ามีการ Login หรือ Logout ให้เปลี่ยนค่าทันทีโดยไม่ต้องรีเฟรช
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 3. ฟังก์ชันออกจากระบบ
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login"); // เด้งไปหน้า Login
    router.refresh(); // รีเฟรชหน้าเว็บให้ข้อมูลเคลียร์
  };

  return (
    <nav className="navbar">
      <Link href="/" className="nav-logo">
        SK25<span>.SHOP</span>
      </Link>

      <ul className="nav-links">
        <li className="nav-item"><Link href="/">หน้าแรก</Link></li>
        <li className="nav-item"><Link href="/services">บริการ</Link></li>
        {/* <li className="nav-item"><Link href="/about">เกี่ยวกับเรา</Link></li> */}

        {/* 4. ส่วนเช็คเงื่อนไข: ล็อกอินอยู่หรือเปล่า? */}
        {user ? (
          // --- กรณีล็อกอินแล้ว ให้โชว์ชื่อ + ปุ่มออก ---
          <li className="nav-item nav-profile-section">
            <div className="user-info">
              <User size={18} />
              {/* โชว์อีเมล (ตัดให้สั้นหน่อยถ้ามันยาว) */}
              <span>{user.email?.split("@")[0]}</span>
            </div>
            
            <button onClick={handleLogout} className="btn-logout" title="ออกจากระบบ">
              <LogOut size={18} />
            </button>
          </li>
        ) : (
          // --- กรณี "ยังไม่ล็อกอิน" ให้โชว์ปุ่มเข้าสู่ระบบ ---
          <li className="nav-item">
            <Link href="/login" className="nav-login-link">
              เข้าสู่ระบบ
            </Link>
          </li>
        )}

        {/* ปุ่มจองคิว (โชว์ตลอด) */}
        <li className="nav-item">
          <Link href="/book" className="nav-btn-book">
            จองคิว
          </Link>
        </li>
      </ul>
    </nav>
  );
}