import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { getFAQs } from '../lib/faqs';

const FAQSection = () => {
  const [openItems, setOpenItems] = React.useState<number[]>([]);

  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ['faqs'],
    queryFn: getFAQs,
  });

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2C5F] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Jawaban untuk pertanyaan yang sering diajukan seputar layanan instalasi CCTV kami
          </p>
        </div>

        {/* FAQ List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : faqs.length > 0 ? (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <Collapsible
                key={faq.id}
                open={openItems.includes(faq.id)}
                onOpenChange={() => toggleItem(faq.id)}
              >
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
                      <h3 className="text-left text-lg font-semibold text-[#0B2C5F] pr-4">
                        {faq.question}
                      </h3>
                      {openItems.includes(faq.id) ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="px-6 pb-6">
                      <div className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">FAQ sedang dalam proses penyusunan</p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-xl font-bold text-[#0B2C5F] mb-4">
            Masih ada pertanyaan lain?
          </h3>
          <p className="text-gray-600 mb-6">
            Tim customer service kami siap membantu menjawab pertanyaan spesifik Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6285129336739?text=Halo%20VisionGuard%2C%20saya%20ada%20pertanyaan%20tentang%20CCTV"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
            >
              Tanya via WhatsApp
            </a>
            <a
              href="mailto:info@visionguard.co.id?subject=Pertanyaan%20tentang%20CCTV"
              className="bg-[#0B2C5F] hover:bg-[#0B2C5F]/90 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
            >
              Kirim Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
