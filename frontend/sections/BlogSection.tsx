import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import backend from '~backend/client';

const BlogSection = () => {
  const { data: blogData, isLoading } = useQuery({
    queryKey: ['published-blog-posts-home'],
    queryFn: () => backend.cms.listPublishedBlogPosts(),
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2C5F] mb-4">
            Blog Edukasi CCTV
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Pelajari tips, panduan, dan informasi terbaru seputar sistem keamanan CCTV dari para ahli VisionGuard
          </p>
        </div>

        {/* Blog Posts */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : blogData?.posts && blogData.posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {blogData.posts.slice(0, 3).map((post) => (
                <article 
                  key={post.id}
                  className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Blog Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-[#0B2C5F] to-[#1e40af] flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-white/80" />
                  </div>

                  {/* Blog Content */}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      <time>{formatDate(post.createdAt)}</time>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#0B2C5F] mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-[#22C55E] hover:text-[#22C55E]/80 font-medium transition-colors"
                    >
                      Baca Selengkapnya
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* View All Blog Posts */}
            <div className="text-center">
              <Link 
                to="/blog"
                className="inline-block bg-[#0B2C5F] hover:bg-[#0B2C5F]/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Lihat Semua Artikel
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-6">
              Artikel sedang dalam proses penulisan
            </p>
            <p className="text-gray-400">
              Kembali lagi nanti untuk membaca tips dan panduan CCTV terbaru
            </p>
          </div>
        )}

        {/* Blog Categories */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Panduan Pemilihan',
              description: 'Tips memilih CCTV yang tepat sesuai kebutuhan dan budget',
              icon: '🎯'
            },
            {
              title: 'Tips Instalasi',
              description: 'Panduan teknis dan best practices pemasangan CCTV',
              icon: '🔧'
            },
            {
              title: 'Perawatan & Maintenance',
              description: 'Cara merawat sistem CCTV agar awet dan optimal',
              icon: '⚙️'
            }
          ].map((category, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-6 rounded-lg text-center hover:bg-white hover:shadow-md transition-all duration-300"
            >
              <div className="text-3xl mb-3">{category.icon}</div>
              <h4 className="text-lg font-semibold text-[#0B2C5F] mb-2">
                {category.title}
              </h4>
              <p className="text-gray-600 text-sm">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
