import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, MessageCircle } from 'lucide-react';

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-16 pb-20 bg-gradient-to-br from-[#0B2C5F] via-[#0B2C5F] to-[#1e40af] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              VisionGuard —{' '}
              <span className="text-[#22C55E]">Keamanan Anda</span>,
              Prioritas Kami
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Instalasi & konsultasi CCTV profesional untuk rumah, toko, kantor, hingga proyek menengah-besar. 
              Solusi keamanan terpercaya dengan teknologi terdepan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white px-8 py-4 text-lg font-semibold"
              >
                Konsultasi Gratis
              </Button>
              
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#0B2C5F] px-8 py-4 text-lg font-semibold"
              >
                <a 
                  href="https://wa.me/6285129336739?text=Halo%20VisionGuard%2C%20saya%20ingin%20konsultasi%20CCTV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Right Content - Placeholder for CCTV illustration */}
          <div className="relative">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <Shield className="h-32 w-32 text-[#22C55E] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Sistem Keamanan Profesional
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  Teknologi CCTV terdepan dengan kualitas gambar HD, monitoring 24/7, 
                  dan integrasi mobile untuk keamanan maksimal.
                </p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-4 h-4 bg-[#22C55E] rounded-full animate-pulse" />
              <div className="absolute bottom-4 left-4 w-3 h-3 bg-white/50 rounded-full animate-pulse delay-1000" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
