import Link from "next/link";
import { Scissors, Calendar, Star, ArrowRight } from "lucide-react";
import "./Home.css"; // เรียกใช้ไฟล์ CSS ที่เราสร้าง

export default function Home() {
  return (
    <div className="page-container">
      
      {/* --- Hero Section --- */}
      <section className="hero">
        <div className="hero-bg" />
        
        <div className="hero-content">
          <h1 className="hero-title">
            เปลี่ยนลุคให้ดูดี <br/> ในแบบที่คุณเป็น
          </h1>
          <p className="hero-subtitle">
            บริการตัดผมชายครบวงจร โดยช่างมืออาชีพ จองคิวง่ายๆ ผ่านออนไลน์ได้ทันที ไม่ต้องรอนาน
          </p>
          <Link href="/book" className="btn-primary">
            <Calendar size={20} /> จองคิวตอนนี้
          </Link>
        </div>
      </section>

      {/* --- Feature Section --- */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {/* Box 1 */}
            <div className="feature-card">
              <div className="icon-wrapper icon-blue">
                <Scissors size={32} />
              </div>
              <h3>ช่างมืออาชีพ</h3>
              <p>ทีมงานมากประสบการณ์ เชี่ยวชาญทั้งทรงวินเทจและแฟชั่นสมัยใหม่</p>
            </div>
            {/* Box 2 */}
            <div className="feature-card">
              <div className="icon-wrapper icon-green">
                <Calendar size={32} />
              </div>
              <h3>จองง่าย ไม่ต้องรอ</h3>
              <p>ระบบจองคิวออนไลน์ เลือกวันเวลาและช่างที่ถูกใจได้เอง 24 ชม.</p>
            </div>
            {/* Box 3 */}
            <div className="feature-card">
              <div className="icon-wrapper icon-yellow">
                <Star size={32} />
              </div>
              <h3>บริการระดับพรีเมียม</h3>
              <p>ใส่ใจทุกรายละเอียด พร้อมผลิตภัณฑ์คุณภาพดีที่สุดเพื่อคุณ</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Services Preview --- */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">บริการยอดนิยม</h2>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-info">
                <h4>ตัดผมชาย (Standard Cut)</h4>
                <p>ตัดแต่งทรงผม + เซ็ตทรง</p>
              </div>
              <span className="service-price">฿250</span>
            </div>

            <div className="service-card">
              <div className="service-info">
                <h4>ตัด + สระ (Cut & Wash)</h4>
                <p>ตัดผม + สระไดร์ผ่อนคลาย</p>
              </div>
              <span className="service-price">฿350</span>
            </div>

            <div className="service-card">
              <div className="service-info">
                <h4>ดัดวอลลุ่ม (Perm)</h4>
                <p>เพิ่มมิติให้ทรงผมสไตล์เกาหลี</p>
              </div>
              <span className="service-price">฿1,500+</span>
            </div>

            <div className="service-card">
              <div className="service-info">
                <h4>ทำสีผม (Coloring)</h4>
                <p>เปลี่ยนสีผมแฟชั่น</p>
              </div>
              <span className="service-price">฿1,200+</span>
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
             <Link href="/book" className="view-all-link">
                ดูบริการทั้งหมด <ArrowRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }}/>
             </Link>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="footer">
        <p>&copy; 2024 SK25 Salon. All rights reserved.</p>
      </footer>

    </div>
  );
}