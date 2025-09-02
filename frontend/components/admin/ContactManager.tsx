import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Phone, Mail, MessageSquare } from 'lucide-react';
import backend from '~backend/client';

const ContactManager = () => {
  const { data: contactData, isLoading } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: () => backend.cms.listContactSubmissions(),
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const formatWhatsAppLink = (number: string, name: string) => {
    const cleanNumber = number.replace(/\D/g, '');
    const formattedNumber = cleanNumber.startsWith('0') 
      ? '62' + cleanNumber.slice(1) 
      : cleanNumber.startsWith('62') 
      ? cleanNumber 
      : '62' + cleanNumber;
    
    return `https://wa.me/${formattedNumber}?text=Halo%20${encodeURIComponent(name)}%2C%20terima%20kasih%20sudah%20menghubungi%20VisionGuard`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#0B2C5F]">Contact Submissions</h1>
        {contactData?.submissions && (
          <div className="text-sm text-gray-600">
            Total: {contactData.submissions.length} submission{contactData.submissions.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Daftar Kontak Masuk</h2>
          
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border rounded p-4 animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : contactData?.submissions && contactData.submissions.length > 0 ? (
            <div className="space-y-6">
              {contactData.submissions.map((submission) => (
                <div key={submission.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-[#0B2C5F]/10 rounded-full flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-[#0B2C5F]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#0B2C5F]">
                          {submission.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(submission.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{submission.whatsapp}</span>
                    </div>
                    {submission.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{submission.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Kebutuhan:</h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {submission.needs}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={formatWhatsAppLink(submission.whatsapp, submission.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#25D366]/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Balas via WhatsApp
                    </a>
                    
                    {submission.email && (
                      <a
                        href={`mailto:${submission.email}?subject=Re: Konsultasi CCTV VisionGuard&body=Halo ${submission.name},%0D%0A%0D%0ATerima kasih sudah menghubungi VisionGuard.%0D%0A%0D%0A`}
                        className="inline-flex items-center justify-center bg-[#0B2C5F] hover:bg-[#0B2C5F]/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Balas via Email
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Belum ada kontak masuk</p>
              <p className="text-gray-400 text-sm mt-2">
                Kontak dari website akan muncul di sini
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      {contactData?.submissions && contactData.submissions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-2xl font-bold text-[#22C55E] mb-2">
              {contactData.submissions.length}
            </div>
            <div className="text-gray-600 text-sm">Total Kontak</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-2xl font-bold text-[#0B2C5F] mb-2">
              {contactData.submissions.filter(s => s.email).length}
            </div>
            <div className="text-gray-600 text-sm">Dengan Email</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {contactData.submissions.filter(s => 
                new Date(s.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              ).length}
            </div>
            <div className="text-gray-600 text-sm">7 Hari Terakhir</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManager;
