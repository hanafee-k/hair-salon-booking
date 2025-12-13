import Link from "next/link";
import Image from "next/image";
import { Scissors, Palette, User, Star, Clock, MapPin, Phone, Calendar } from "lucide-react";

export default function Home() {
  // Mock Data for Services
  const services = [
    {
      id: 1,
      name: "Classic Haircut",
      price: "$25",
      duration: "45 mins",
      icon: <Scissors className="w-6 h-6 text-indigo-600" />,
      description: "Precision cut tailored to your face shape and style.",
    },
    {
      id: 2,
      name: "Beard Trim & Shave",
      price: "$20",
      duration: "30 mins",
      icon: <User className="w-6 h-6 text-indigo-600" />,
      description: "Hot towel shave and detailed beard sculpting.",
    },
    {
      id: 3,
      name: "Creative Coloring",
      price: "$60+",
      duration: "90 mins",
      icon: <Palette className="w-6 h-6 text-indigo-600" />,
      description: "Full color, highlights, or bleaching services.",
    },
  ];

  // Mock Data for Barbers
  const barbers = [
    {
      id: 1,
      name: "Alex Johnson",
      specialty: "Fade Master",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Sarah Davis",
      specialty: "Color Expert",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60",
      rating: 5.0,
    },
    {
      id: 3,
      name: "Mike Chen",
      specialty: "Classic Cuts",
      image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&auto=format&fit=crop&q=60",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Davina Smith",
      specialty: "Stylist",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60",
      rating: 4.9,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop"
            alt="Barbershop Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" /> {/* Dark Overlay */}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Style Your <span className="text-indigo-400">Perfect Look</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Experience premium grooming services. From classic cuts to modern styles, 
            our expert barbers are here to make you look your best.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book" 
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Book Now
            </Link>
            <Link 
              href="/services" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full font-semibold text-lg transition-all"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Our Premium Services</h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Top-tier grooming packages designed for the modern individual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col items-start"
            >
              <div className="p-3 bg-indigo-50 rounded-xl mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800">{service.name}</h3>
              <p className="text-slate-500 mb-6 flex-grow">{service.description}</p>
              <div className="flex items-center justify-between w-full pt-4 border-t border-slate-100">
                <span className="text-sm font-medium text-slate-400 flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {service.duration}
                </span>
                <span className="text-lg font-bold text-indigo-600">{service.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BARBERS SECTION */}
      <section className="py-20 bg-slate-100">
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Meet Our Barbers</h2>
              <p className="text-slate-600">Expert hands you can trust.</p>
            </div>
            <Link href="/team" className="hidden md:block text-indigo-600 font-semibold hover:underline">
              See All Team →
            </Link>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {barbers.map((barber) => (
              <div key={barber.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={barber.image}
                    alt={barber.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold">{barber.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900">{barber.name}</h3>
                  <p className="text-sm text-indigo-600 font-medium mb-4">{barber.specialty}</p>
                  <Link 
                    href={`/book?barber=${barber.id}`}
                    className="block w-full text-center py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-transparent transition-colors text-sm font-medium"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/team" className="text-indigo-600 font-semibold hover:underline">
              See All Team →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Scissors className="w-8 h-8 text-indigo-500" />
              <span className="text-2xl font-bold text-white">Trim & Tone</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              The premier destination for modern grooming. We combine old-school artistry with modern techniques to help you look your best.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">FB</div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">IG</div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">TW</div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-500 shrink-0" />
                <span>123 Style Street, Fashion District,<br/>New York, NY 10012</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-indigo-500 shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-indigo-500 shrink-0" />
                <span>book@trimandtone.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Opening Hours</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span className="text-white">9:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white">10:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-indigo-400">Closed</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-slate-800 mt-16 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Trim & Tone Salon. All rights reserved.
        </div>
      </footer>
    </div>
  );
}