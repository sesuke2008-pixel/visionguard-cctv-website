import React from 'react';
import { Shield, Award, MapPin, Headphones } from 'lucide-react';

const TrustBar = () => {
  const features = [
    {
      icon: Shield,
      title: 'Teknisi Bersertifikat',
      description: 'Tim ahli dengan sertifikasi profesional'
    },
    {
      icon: Award,
      title: 'Garansi Pemasangan',
      description: 'Jaminan kualitas instalasi terbaik'
    },
    {
      icon: MapPin,
      title: 'Survey Lokasi',
      description: 'Konsultasi dan survey gratis'
    },
    {
      icon: Headphones,
      title: 'Dukungan Purna Jual',
      description: 'Support teknis berkelanjutan'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-[#0B2C5F]/10 rounded-full flex items-center justify-center mb-4">
                  <Icon className="h-8 w-8 text-[#0B2C5F]" />
                </div>
                <h3 className="text-lg font-semibold text-[#0B2C5F] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
