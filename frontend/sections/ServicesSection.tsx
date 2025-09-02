import React from 'react';
import { Camera, Users, Settings, Monitor } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Camera,
      title: 'Instalasi CCTV End-to-End',
      description: 'Pemasangan sistem CCTV lengkap dari konsultasi, desain, instalasi hingga konfigurasi final dengan teknologi terdepan.',
      features: ['Survey lokasi gratis', 'Desain sistem optimal', 'Instalasi profesional', 'Testing & commissioning']
    },
    {
      icon: Users,
      title: 'Konsultasi & Desain Sistem',
      description: 'Layanan konsultasi ahli untuk merancang sistem keamanan yang sesuai dengan kebutuhan dan budget Anda.',
      features: ['Analisis kebutuhan', 'Rekomendasi perangkat', 'Layout optimal', 'Estimasi biaya']
    },
    {
      icon: Settings,
      title: 'Perawatan & Upgrade',
      description: 'Maintenance berkala dan upgrade sistem untuk memastikan performa optimal dan teknologi up-to-date.',
      features: ['Maintenance rutin', 'Cleaning & adjustment', 'System upgrade', 'Performance monitoring']
    },
    {
      icon: Monitor,
      title: 'Integrasi Monitoring Jarak Jauh',
      description: 'Setup sistem monitoring yang dapat diakses dari mana saja melalui smartphone atau komputer.',
      features: ['Mobile app setup', 'Remote monitoring', 'Real-time alerts', 'Cloud integration']
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2C5F] mb-4">
            Layanan Profesional Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Solusi keamanan CCTV lengkap dengan standar industri terbaik untuk berbagai kebutuhan bisnis dan residensial
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-[#22C55E]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="h-8 w-8 text-[#22C55E]" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#0B2C5F] mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-[#22C55E] rounded-full mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Butuh konsultasi untuk menentukan layanan yang tepat?
          </p>
          <a
            href="https://wa.me/6285129336739?text=Halo%20VisionGuard%2C%20saya%20ingin%20konsultasi%20CCTV"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#22C55E] hover:bg-[#22C55E]/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Konsultasi Gratis Sekarang
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
