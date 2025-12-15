import { Kanit } from "next/font/google";
import "./globals.css";
// import Navbar เข้ามาใช้งาน
import Navbar from "../components/Navbar";

// ตั้งค่าฟอนต์ Kanit
const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "700"],
  display: 'swap',
});

export const metadata = {
  title: "SK25 Salon", 
  description: "บริการตัดผมชายครบวงจร จองคิวออนไลน์",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={kanit.className}>
        {/* ใส่ Navbar ไว้ตรงนี้ เพื่อให้มันโชว์ทุกหน้า */}
        <Navbar />
        
        {/* ส่วนเนื้อหาของแต่ละหน้าจะถูกแทรกตรง children นี้ */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}