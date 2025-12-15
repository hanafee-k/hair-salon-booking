import Link from 'next/link';
import { Scissors, Clock, Star, Calendar } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/20">
              <Scissors className="w-5 h-5 text-purple-300" />
              <span className="text-white font-semibold">ร้านตัดผมพรีเมียม</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              สไตล์ของคุณ
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                เพอร์เฟกต์ทุกครั้ง
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              สัมผัสประสบการณ์การดูแลผมระดับพรีเมียมจากช่างมืออาชีพ 
              จองคิวง่ายๆ ในไม่กี่วินาที พร้อมเปลี่ยนลุคใหม่
            </p>

            <Link 
              href="/book"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              จองคิวเลย
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <FeatureCard
              icon={<Scissors className="w-8 h-8" />}
              title="ช่างมืออาชีพ"
              description="ช่างผู้เชี่ยวชาญที่ผ่านการรับรอง มีประสบการณ์และความใส่ใจในทุกรายละเอียด"
            />
            <FeatureCard
              icon={<Clock className="w-8 h-8" />}
              title="จองง่ายรวดเร็ว"
              description="เลือกช่วงเวลาที่สะดวกและจองได้ทันที ไม่ต้องโทรศัพท์"
            />
            <FeatureCard
              icon={<Star className="w-8 h-8" />}
              title="บริการพรีเมียม"
              description="ตั้งแต่ตัดผมธรรมดาไปจนถึงแพ็คเกจบริการเต็มรูปแบบ เราส่งมอบความเป็นเลิศทุกครั้ง"
            />
          </div>
        </div>
      </div>

      {/* Services Preview */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            บริการของเรา
          </h2>
          <p className="text-center text-gray-600 mb-12">
            เลือกบริการดูแลผมระดับมืออาชีพที่คุณต้องการ
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard
              name="ตัดผมด่วน"
              duration="30 นาที"
              price="฿250"
              description="เหมาะสำหรับการตัดแต่งรูปทรงให้เรียบร้อย"
            />
            <ServiceCard
              name="ตัดผมพรีเมียม"
              duration="45 นาที"
              price="฿450"
              description="บริการตัดผมพร้อมคำปรึกษาเรื่องทรงผม"
              featured
            />
            <ServiceCard
              name="บริการเต็มรูปแบบ"
              duration="60 นาที"
              price="฿650"
              description="ตัดผม ตัดแต่งหนวด และโกนหนวดด้วยผ้าร้อน"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
      <div className="text-purple-400 mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function ServiceCard({ 
  name, 
  duration, 
  price, 
  description, 
  featured = false 
}: { 
  name: string; 
  duration: string; 
  price: string; 
  description: string;
  featured?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-6 ${featured ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-xl scale-105' : 'bg-gray-50 text-gray-900'}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold">{name}</h3>
        <span className={`text-2xl font-bold ${featured ? 'text-white' : 'text-purple-600'}`}>
          {price}
        </span>
      </div>
      <p className={`text-sm mb-4 ${featured ? 'text-purple-100' : 'text-gray-600'}`}>
        {description}
      </p>
      <div className={`flex items-center gap-2 text-sm ${featured ? 'text-purple-200' : 'text-gray-500'}`}>
        <Clock className="w-4 h-4" />
        {duration}
      </div>
    </div>
  );
}