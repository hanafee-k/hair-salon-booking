"use client"; // 1. ต้องใส่บรรทัดนี้ เพราะมีการดึงข้อมูล User และกดปุ่ม Logout

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { Scissors, User, LogOut } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="logo-section">
          <div className="logo-icon">
            <Scissors size={20} />
          </div>
          <span className="logo-text">Luxe Cuts</span>
        </Link>
        
        <div className="nav-links">
          <Link href="/" className="nav-link">หน้าแรก</Link>
          <Link href="/services" className="nav-link">บริการ</Link>
          <Link href="/dashboard" className="nav-link">แดชบอร์ด</Link>
        </div>
        
        <div className="nav-actions">
          {user ? (
            <>
              <div className="user-info">
                <User size={18} />
                <span>{user.email?.split("@")[0]}</span>
              </div>
              <button onClick={handleLogout} className="btn-logout" title="ออกจากระบบ">
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <Link href="/login" className="btn-login">
              เข้าสู่ระบบ
            </Link>
          )}
          
          <Link href="/book" className="btn-book">
            จองคิวตอนนี้
          </Link>
        </div>
      </div>
    </nav>
  );
}