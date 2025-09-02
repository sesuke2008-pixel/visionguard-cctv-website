import React from 'react';
import { MessageCircle, Search, Wrench, CheckCircle } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      icon: MessageCircle,
      title: 'Konsultasi',
      description: 'Diskusi kebutuhan keamanan Anda dengan tim ahli kami melalui WhatsApp atau kunjungan langsung.',
      details: ['Analisis kebutuhan', 'Diskusi budget', 'Pemilihan teknologi']
    },
    {
      icon: Search,
      title: 'Survey & Desain',
      description: 'Tim teknisi melakukan survey lokasi untuk merancang sistem yang optimal sesuai kondisi lapangan.',
      details: ['Survey lokasi gratis', 'Desain layout kamera', 'Proposal lengkap']
    },
    {
      icon: Wrench,
      title: 'Instalasi',
      description: 'Pemasangan sistem CCTV profesional dengan standar industri dan waktu pengerjaan yang tepat.',
      details: ['Instalasi perangkat', 'Konfigurasi sistem', 'Testing lengkap']
    },
    {
      icon: CheckCircle,
      title: 'Serah Terima & Pelatihan',
      description: 'Serah terima sistem yang sudah siap pakai dengan pelatihan singkat penggunaan untuk user.',
      details: ['Demo sistem', 'Pelatihan user', 'Dokumentasi lengkap']
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2C5F] mb-4">
            Proses Kerja Profesional
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Metode kerja terstruktur untuk memastikan hasil instalasi CCTV yang optimal dan sesuai kebutuhan Anda
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Timeline Line - Hidden on mobile */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-[#0B2C5F]/20" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Step Number Circle */}
                  <div className="relative z-10 w-16 h-16 bg-[#0B2C5F] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-2 z-20 w-6 h-6 bg-[#22C55E] rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-[#0B2C5F] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <ul className="space-y-1 text-sm text-gray-500">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Info */}
        <div className="text-center mt-12 p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-[#0B2C5F] mb-2">
            Estimasi Waktu Pengerjaan
          </h3>
          <p className="text-gray-600">
            <span className="font-medium text-[#22C55E]">1-3 hari kerja</span> untuk instalasi standar, 
            tergantung kompleksitas sistem dan jumlah kamera
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
