import React from 'react';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PricingSection = () => {
  const packages = [
    {
      name: 'Basic',
      target: 'Rumah / UMKM',
      description: 'Solusi keamanan dasar untuk rumah tinggal dan usaha kecil',
      features: [
        '2-4 kamera HD',
        'DVR/NVR 4 channel',
        'Hard disk 1TB',
        'Pemasangan standar',
        'Garansi 1 tahun',
        'Training dasar'
      ],
      popular: false
    },
    {
      name: 'Business',
      target: 'Toko / Kantor Kecil',
      description: 'Paket lengkap untuk bisnis dengan kebutuhan monitoring menengah',
      features: [
        '6-12 kamera IP',
        'NVR 16 channel',
        'Hard disk 2TB',
        'Network setup',
        'Mobile app setup',
        'Pelatihan lengkap',
        'Garansi 2 tahun',
        'Remote monitoring'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      target: 'Kantor / Pabrik Menengah',
      description: 'Solusi enterprise untuk kebutuhan keamanan skala besar',
      features: [
        '16+ kamera 4K',
        'NVR multi-channel',
        'Storage redundant',
        'Jaringan tersegmentasi',
        'Dokumentasi lengkap',
        'Kunjungan berkala',
        'Garansi extended',
        'Support 24/7',
        'Integration system'
      ],
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2C5F] mb-4">
            Paket Harga CCTV
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Pilihan paket instalasi CCTV sesuai kebutuhan dan budget Anda. Semua paket sudah termasuk konsultasi gratis.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl border-2 p-8 ${
                pkg.popular 
                  ? 'border-[#22C55E] bg-[#22C55E]/5 transform scale-105' 
                  : 'border-gray-200 bg-white hover:border-[#0B2C5F]/20'
              } transition-all duration-300 hover:shadow-lg`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#22C55E] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Paling Populer
                  </div>
                </div>
              )}

              {/* Package Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#0B2C5F] mb-2">
                  {pkg.name}
                </h3>
                <p className="text-[#22C55E] font-semibold mb-3">
                  {pkg.target}
                </p>
                <p className="text-gray-600 text-sm">
                  {pkg.description}
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-[#22C55E] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button 
                asChild
                className={`w-full ${
                  pkg.popular 
                    ? 'bg-[#22C55E] hover:bg-[#22C55E]/90' 
                    : 'bg-[#0B2C5F] hover:bg-[#0B2C5F]/90'
                } text-white`}
              >
                <a
                  href="https://wa.me/6285129336739?text=Halo%20VisionGuard%2C%20saya%20tertarik%20dengan%20paket%20CCTV"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Konsultasi Paket {pkg.name}
                </a>
              </Button>
            </div>
          ))}
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            Harga Final Setelah Survey
          </h3>
          <p className="text-yellow-700 text-sm leading-relaxed">
            Harga paket di atas adalah estimasi dasar. Harga final akan ditentukan setelah survey lokasi gratis 
            berdasarkan kondisi lapangan, jarak kabel, dan spesifikasi detail yang dibutuhkan.
          </p>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold text-[#0B2C5F] mb-3">Yang Sudah Termasuk:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Konsultasi dan survey gratis</li>
              <li>• Pemasangan dan konfigurasi</li>
              <li>• Testing sistem lengkap</li>
              <li>• Garansi perangkat dan instalasi</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold text-[#0B2C5F] mb-3">Biaya Tambahan:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Kabel ekstra panjang (&gt;20m)</li>
              <li>• Instalasi di ketinggian &gt;4m</li>
              <li>• Perangkat tambahan sesuai permintaan</li>
              <li>• Cloud storage (opsional)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
