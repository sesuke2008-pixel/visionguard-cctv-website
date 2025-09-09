import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Phone, Mail, Instagram, MapPin, Clock } from 'lucide-react';
import { createContactSubmission } from '../lib/contact';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    needs: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.whatsapp || !formData.needs) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang wajib diisi",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await createContactSubmission(formData);
      
      toast({
        title: "Berhasil!",
        description: "Terima kasih! Kami akan segera menghubungi Anda.",
      });

      // Reset form
      setFormData({
        name: '',
        whatsapp: '',
        email: '',
        needs: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2C5F] mb-4">
            Hubungi Kami Sekarang
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Siap memberikan solusi keamanan CCTV terbaik untuk Anda. Konsultasi gratis dan survey lokasi tanpa dipungut biaya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-[#0B2C5F] mb-6">
                Informasi Kontak
              </h3>
              
              <div className="space-y-6">
                <a 
                  href="https://wa.me/6285129336739?text=Halo%20VisionGuard%2C%20saya%20ingin%20konsultasi%20CCTV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-[#22C55E]/10 transition-colors"
                >
                  <div className="w-12 h-12 bg-[#22C55E] rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B2C5F]">WhatsApp</div>
                    <div className="text-gray-600">+62 851-2933-6739</div>
                  </div>
                </a>

                <a 
                  href="mailto:info@visionguard.co.id?subject=Konsultasi%20CCTV%20VisionGuard"
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-[#0B2C5F]/10 transition-colors"
                >
                  <div className="w-12 h-12 bg-[#0B2C5F] rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B2C5F]">Email</div>
                    <div className="text-gray-600">info@visionguard.co.id</div>
                  </div>
                </a>

                <a 
                  href="https://www.instagram.com/vision_guard.id?igsh=MWUyeXd2b3Z5ZGo1cw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-pink-500/10 transition-colors"
                >
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                    <Instagram className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B2C5F]">Instagram</div>
                    <div className="text-gray-600">@vision_guard.id</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-[#0B2C5F] mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Jam Operasional
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Senin - Jumat</span>
                  <span>08:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu</span>
                  <span>08:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Minggu</span>
                  <span>Emergency Only</span>
                </div>
              </div>
            </div>

            {/* Service Area */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-[#0B2C5F] mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Area Layanan
              </h4>
              <p className="text-gray-600 text-sm">
                Melayani wilayah Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi) 
                dengan tim teknisi profesional yang siap datang ke lokasi Anda.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-[#0B2C5F] mb-6">
              Form Konsultasi
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor WhatsApp *
                </label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="Contoh: 0812-3456-7890"
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email (Opsional)
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@example.com"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="needs" className="block text-sm font-medium text-gray-700 mb-2">
                  Kebutuhan CCTV *
                </label>
                <Textarea
                  id="needs"
                  name="needs"
                  value={formData.needs}
                  onChange={handleInputChange}
                  placeholder="Ceritakan kebutuhan CCTV Anda (jenis lokasi, jumlah kamera, budget, dll)"
                  className="w-full h-32"
                  required
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#22C55E] hover:bg-[#22C55E]/90 text-white py-3"
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                * Field wajib diisi. Data Anda akan dijaga kerahasiaannya.
              </p>
            </form>
          </div>
        </div>

        {/* Quick Contact Buttons */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold text-[#0B2C5F] mb-6">
            Atau Hubungi Langsung
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6285129336739?text=Halo%20VisionGuard%2C%20saya%20ingin%20konsultasi%20CCTV"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#25D366]/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              <Phone className="mr-2 h-5 w-5" />
              Chat WhatsApp
            </a>
            <a
              href="mailto:info@visionguard.co.id?subject=Konsultasi%20CCTV%20VisionGuard"
              className="bg-[#0B2C5F] hover:bg-[#0B2C5F]/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              <Mail className="mr-2 h-5 w-5" />
              Kirim Email
            </a>
            <a
              href="https://www.instagram.com/vision_guard.id?igsh=MWUyeXd2b3Z5ZGo1cw=="
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 hover:bg-pink-500/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Follow Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
