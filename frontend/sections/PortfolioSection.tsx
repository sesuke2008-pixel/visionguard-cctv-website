import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Building, Home, Store, Warehouse, School, Calendar } from 'lucide-react';
import backend from '~backend/client';

const PortfolioSection = () => {
  const { data: portfolioData, isLoading } = useQuery({
    queryKey: ['portfolio-projects'],
    queryFn: () => backend.cms.listPortfolioProjects(),
  });

  const getProjectIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'perkantoran':
        return Building;
      case 'residensial':
      case 'perumahan':
        return Home;
      case 'retail':
        return Store;
      case 'industri':
        return Warehouse;
      case 'pendidikan':
        return School;
      default:
        return Building;
    }
  };

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long'
    }).format(new Date(date));
  };

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2C5F] mb-4">
            Portofolio Proyek Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Lihat berbagai proyek instalasi CCTV yang telah berhasil kami kerjakan untuk berbagai jenis klien
          </p>
        </div>

        {/* Portfolio Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : portfolioData?.projects && portfolioData.projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.slice(0, 6).map((project) => {
              const Icon = getProjectIcon(project.projectType);
              return (
                <div 
                  key={project.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Project Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-[#0B2C5F] to-[#1e40af] flex items-center justify-center">
                    <Icon className="h-16 w-16 text-white/80" />
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#0B2C5F] mb-2">
                      {project.title}
                    </h3>
                    
                    {project.description && (
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {project.description}
                      </p>
                    )}

                    <div className="space-y-2 text-sm text-gray-500">
                      {project.clientName && (
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Klien:</span>
                          <span>{project.clientName}</span>
                        </div>
                      )}
                      
                      {project.cameraCount && (
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Kamera:</span>
                          <span>{project.cameraCount} unit</span>
                        </div>
                      )}
                      
                      {project.completionDate && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{formatDate(project.completionDate)}</span>
                        </div>
                      )}
                    </div>

                    {/* Project Type Badge */}
                    <div className="mt-4">
                      <span className="inline-block bg-[#22C55E]/10 text-[#22C55E] px-3 py-1 rounded-full text-xs font-medium">
                        {project.projectType}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Belum ada proyek yang ditampilkan</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Ingin proyek Anda menjadi yang berikutnya?
          </p>
          <a
            href="https://wa.me/6285129336739?text=Halo%20VisionGuard%2C%20saya%20ingin%20konsultasi%20untuk%20proyek%20CCTV"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#22C55E] hover:bg-[#22C55E]/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Diskusikan Proyek Anda
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
