import Link from "next/link";
import { Scissors,  Shield, Star, Clock } from "lucide-react";
import "./Home.css";

export default function Home() {
  return (
    <div className="page-wrapper">
    
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background" />
        <div className="hero-overlay" />
        
        <div className="hero-container">
          <div className="hero-text-content">
            <p className="hero-label">ประสบการณ์การดูแลระดับพรีเมียม</p>
            <h1 className="hero-heading">
              เปลี่ยนลุคให้ดูดี<br />ในแบบที่คุณเป็น
            </h1>
            <p className="hero-description">
              ช่างมืออาชีพ ผลิตภัณฑ์คุณภาพ และบรรยากาศผ่อนคลาย
              สัมผัสประสบการณ์ตัดผมที่ดีที่สุดในเมือง
            </p>
            <div className="hero-buttons">
              <button className="btn-primary-hero">จองคิวเลย</button>
              <button className="btn-secondary-hero">ดูบริการทั้งหมด</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-area">
        <div className="content-container">
          <div className="features-grid-layout">
            <div className="feature-box">
              <div className="feature-icon-circle icon-teal">
                <Clock size={28} />
              </div>
              <h3 className="feature-title">จองง่าย ไม่ต้องรอ</h3>
              <p className="feature-text">
                จองคิวได้ในไม่กี่วินาทีผ่านระบบออนไลน์ของเรา
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-circle icon-teal">
                <Shield size={28} />
              </div>
              <h3 className="feature-title">ช่างมืออาชีพ</h3>
              <p className="feature-text">
                ทีมงานผู้เชี่ยวชาญที่มีประสบการณ์หลายปี
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-circle icon-teal">
                <Star size={28} />
              </div>
              <h3 className="feature-title">ผลิตภัณฑ์ระดับพรีเมียม</h3>
              <p className="feature-text">
                ใช้เฉพาะผลิตภัณฑ์ออร์แกนิกชั้นนำเพื่อคุณ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-area">
        <div className="content-container">
          <div className="section-header">
            <h2 className="section-heading">บริการของเรา</h2>
            <p className="section-subheading">
              บริการดูแลทรงผมที่ออกแบบมาเพื่อให้คุณดูดีและรู้สึกดีที่สุด
            </p>
          </div>

          <div className="services-grid-layout">
            <div className="service-box">
              <div className="service-icon-box">
                <Scissors size={24} />
              </div>
              <div className="service-header">
                <h3 className="service-name">ตัดผมชาย (มาตรฐาน)</h3>
                <span className="service-price">฿250</span>
              </div>
              <p className="service-desc">
                ตัดแต่งทรงผม สระ และจัดแต่งทรงตามรูปหน้า
              </p>
              <div className="service-duration">
                <Clock size={16} />
                <span>45 นาที</span>
              </div>
            </div>

            <div className="service-box">
              <div className="service-icon-box">
                <Scissors size={24} />
              </div>
              <div className="service-header">
                <h3 className="service-name">ตัดเครา + จัดทรง</h3>
                <span className="service-price">฿200</span>
              </div>
              <p className="service-desc">
                โกนด้วยผ้าร้อน ตัดแต่งอย่างประณีต พร้อมออยล์บำรุงเครา
              </p>
              <div className="service-duration">
                <Clock size={16} />
                <span>30 นาที</span>
              </div>
            </div>

            <div className="service-box">
              <div className="service-icon-box">
                <Scissors size={24} />
              </div>
              <div className="service-header">
                <h3 className="service-name">แพ็คเกจเอ็กเซ็กคิวทีฟ</h3>
                <span className="service-price">฿650</span>
              </div>
              <p className="service-desc">
                ตัดผม ตัดเครา ทำหน้า และนวดศีรษะผ่อนคลาย
              </p>
              <div className="service-duration">
                <Clock size={16} />
                <span>90 นาที</span>
              </div>
            </div>

            <div className="service-box">
              <div className="service-icon-box">
                <Scissors size={24} />
              </div>
              <div className="service-header">
                <h3 className="service-name">ทำสีผม</h3>
                <span className="service-price">฿1,200+</span>
              </div>
              <p className="service-desc">
                ย้อมสีเต็มหัวหรือไฮไลท์ด้วยผลิตภัณฑ์ออร์แกนิกพรีเมียม
              </p>
              <div className="service-duration">
                <Clock size={16} />
                <span>120 นาที</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-area">
        <div className="content-container">
          <div className="cta-box">
            <div className="cta-pattern" />
            
            <div className="cta-content-wrapper">
              <div className="cta-text-section">
                <h2 className="cta-title">พร้อมสำหรับลุคใหม่แล้วหรือยัง?</h2>
                <p className="cta-description">
                  จองคิววันนี้และสัมผัสความแตกต่าง 
                  รับ Walk-in ได้ แต่แนะนำให้จองล่วงหน้า
                </p>
                <button className="cta-button">จองคิวตอนนี้เลย</button>
              </div>
              
              <div className="cta-review-card">
                <div className="review-content">
                  <div className="review-rating">4.9</div>
                  <div className="review-stars-section">
                    <div className="review-stars">
                      <Star size={20} className="star-filled" />
                      <Star size={20} className="star-filled" />
                      <Star size={20} className="star-filled" />
                      <Star size={20} className="star-filled" />
                      <Star size={20} className="star-filled" />
                    </div>
                    <p className="review-text">จาก 500+ รีวิว</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="content-container">
          <div className="footer-grid">
            <div className="footer-column">
              <div className="footer-logo">
                <div className="footer-logo-icon">
                  <Scissors size={20} />
                </div>
                <span className="footer-logo-text">Luxe Cuts</span>
              </div>
              <p className="footer-description">
                บริการดูแลทรงผมระดับพรีเมียม สำหรับคนยุคใหม่
                สัมผัสศิลปะแห่งการจัดแต่งทรงผม
              </p>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">ลิงก์ด่วน</h4>
              <ul className="footer-links">
                <li><Link href="/">หน้าแรก</Link></li>
                <li><Link href="/book">จองคิว</Link></li>
                <li><Link href="/services">บริการ</Link></li>
                <li><Link href="/about">เกี่ยวกับเรา</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">ติดต่อ</h4>
              <ul className="footer-info">
                <li>123 ถนนสไตล์</li>
                <li>กรุงเทพฯ 10120</li>
                <li>02-123-4567</li>
                <li>hello@luxecuts.com</li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">เวลาทำการ</h4>
              <ul className="footer-hours">
                <li>
                  <span>จันทร์ - ศุกร์</span>
                  <span>9:00 - 20:00</span>
                </li>
                <li>
                  <span>เสาร์</span>
                  <span>10:00 - 18:00</span>
                </li>
                <li>
                  <span>อาทิตย์</span>
                  <span>ปิด</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Luxe Cuts สงวนลิขสิทธิ์</p>
          </div>
        </div>
      </footer>
    </div>
  );
}