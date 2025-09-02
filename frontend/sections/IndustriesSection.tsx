import React from 'react';
import { Home, Store, Building, Warehouse, School } from 'lucide-react';

const IndustriesSection = () => {
  const industries = [
    {
      icon: Home,
      title: 'Rumah Tinggal',
      description: 'Sistem keamanan untuk rumah dengan monitoring area strategis seperti pintu masuk, halaman, dan area parkir.',
      features: ['2-8 kamera', 'Mobile monitoring', 'Night vision', 'Motion detection']
    },
    {
      icon: Store,
      title: 'Toko & UMKM',
      description: 'Solusi CCTV untuk toko retail, warung, dan usaha kecil menengah dengan fokus area kasir dan gudang.',
      features: ['Area kasir', 'Monitoring stok', 'Recording 24/7', 'Anti-theft system']
    },
    {
      icon: Building,
      title: 'Perkantoran',
      description: 'Sistem keamanan terintegrasi untuk gedung kantor dengan akses kontrol dan monitoring multi-lantai.',
      features: ['Multi-floor coverage', 'Access control', 'Visitor management', 'Network integration']
    },
    {
      icon: Warehouse,
      title: 'Gudang & Industri',
      description: 'Monitoring keamanan untuk area industri, gudang besar, dan fasilitas produksi dengan coverage maksimal.',
      features: ['Wide area coverage', 'Industrial grade', 'Weather resistant', 'Remote monitoring']
    },
    {
      icon: School,
      title: 'Institusi Pendidikan',
      description: 'Sistem keamanan untuk sekolah, kampus, dan lembaga pendidikan dengan fokus keamanan siswa.',
      features: ['Child-safe installation', 'Playground monitoring', 'Entry/exit control', 'Emergency response']
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2C5F] mb-4">
            Industri yang Kami Layani
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Pengalaman luas melayani berbagai sektor dengan solusi CCTV yang disesuaikan dengan kebutuhan spesifik setiap industri
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div 
                key={index}
                className="group bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#0B2C5F]/10"
              >
                <div className="w-16 h-16 bg-[#0B2C5F]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#22C55E]/10 transition-colors">
                  <Icon className="h-8 w-8 text-[#0B2C5F] group-hover:text-[#22C55E] transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-[#0B2C5F] mb-3">
                  {industry.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {industry.description}
                </p>
                
                <ul className="space-y-2">
                  {industry.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Coverage Area */}
        <div className="bg-[#0B2C5F] rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Area Layanan Kami</h3>
          <p className="text-lg mb-6 text-gray-200">
            Melayani wilayah Jabodetabek dengan tim teknisi profesional
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            {['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi'].map((city) => (
              <div key={city} className="bg-white/10 rounded-lg py-2 px-4 font-medium">
                {city}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-300 mt-4">
            *Untuk area di luar Jabodetabek, silakan konsultasi terlebih dahulu
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
