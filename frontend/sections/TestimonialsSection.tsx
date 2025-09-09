import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Star, Quote } from 'lucide-react';
import { getTestimonials } from '../lib/testimonials';

const TestimonialsSection = () => {
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonials,
  });

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2C5F] mb-4">
            Testimoni Klien
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kepuasan klien adalah prioritas utama kami. Berikut testimoni dari berbagai klien yang telah mempercayakan keamanan mereka kepada VisionGuard.
          </p>
        </div>

        {/* Testimonials Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 6).map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4">
                  <Quote className="h-6 w-6 text-[#22C55E]/30" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-semibold text-[#0B2C5F]">
                    {testimonial.name}
                  </div>
                  {testimonial.company && (
                    <div className="text-sm text-gray-500">
                      {testimonial.company}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Belum ada testimoni yang tersedia</p>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
          {[
            { number: '500+', label: 'Proyek Selesai' },
            { number: '98%', label: 'Tingkat Kepuasan' },
            { number: '24/7', label: 'Support Teknis' },
            { number: '5 Tahun', label: 'Pengalaman' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-[#22C55E] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Bergabunglah dengan ratusan klien yang telah merasakan pelayanan terbaik kami
          </p>
          <a
            href="https://wa.me/6285129336739?text=Halo%20VisionGuard%2C%20saya%20ingin%20konsultasi%20CCTV"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#22C55E] hover:bg-[#22C55E]/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Mulai Konsultasi Sekarang
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
