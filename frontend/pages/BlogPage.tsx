import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { getPublishedPosts } from '../lib/blog';

const BlogPage = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['published-blog-posts'],
    queryFn: getPublishedPosts,
  });

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0B2C5F] mb-4">
            Blog Edukasi VisionGuard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pelajari tips, trik, dan panduan lengkap seputar sistem keamanan CCTV dari para ahli
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid gap-8">
            {posts.map((post) => (
              <article 
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <time>{formatDate(post.created_at)}</time>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-[#0B2C5F] mb-4 hover:text-[#0B2C5F]/80 transition-colors">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  {post.excerpt && (
                    <p className="text-gray-600 mb-6 leading-relaxed">
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Belum ada artikel yang dipublikasi
            </p>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link 
            to="/"
            className="inline-flex items-center text-[#0B2C5F] hover:text-[#0B2C5F]/80 font-medium transition-colors"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
