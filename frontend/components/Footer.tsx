import React from 'react';
import { Shield, Clock, MapPin, Phone, Mail, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B2C5F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-[#22C55E]" />
              <span className="text-xl font-bold">VisionGuard</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Spesialis instalasi dan konsultasi sistem keamanan CCTV untuk rumah, toko, kantor, dan industri. 
              Solusi keamanan terpercaya dengan teknologi terdepan.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Layanan Kami</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Instalasi CCTV End-to-End</li>
              <li>Konsultasi & Desain Sistem</li>
              <li>Perawatan & Upgrade</li>
              <li>Monitoring Jarak Jauh</li>
              <li>Survey Lokasi Gratis</li>
            </ul>
          </div>

          {/* Operating Hours & Area */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informasi</h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div>Senin - Jumat: 08:00 - 17:00</div>
                  <div>Sabtu: 08:00 - 14:00</div>
                  <div>Minggu: Emergency Only</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Area Layanan: Jakarta, Bogor, Depok, Tangerang, Bekasi</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hubungi Kami</h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <a 
                href="https://wa.me/6285129336739?text=Halo%20VisionGuard%2C%20saya%20ingin%20konsultasi%20CCTV"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-[#22C55E] transition-colors"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+62 851-2933-6739</span>
              </a>
              <a 
                href="mailto:info@visionguard.co.id?subject=Konsultasi%20CCTV%20VisionGuard"
                className="flex items-center space-x-2 hover:text-[#22C55E] transition-colors"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@visionguard.co.id</span>
              </a>
              <a 
                href="https://instagram.com/visionguard.official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-[#22C55E] transition-colors"
              >
                <Instagram className="h-4 w-4 flex-shrink-0" />
                <span>@visionguard.official</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} VisionGuard. Hak cipta dilindungi undang-undang.
            </p>
            <div className="flex items-center space-x-6 text-gray-400 text-sm">
              <button className="hover:text-white transition-colors">Kebijakan Privasi</button>
              <button className="hover:text-white transition-colors">Syarat & Ketentuan</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
