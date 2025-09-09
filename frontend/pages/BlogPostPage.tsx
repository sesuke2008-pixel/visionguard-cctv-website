import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Calendar, ArrowLeft } from 'lucide-react';
import { getPostBySlug } from '../lib/blog';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => getPostBySlug(slug!),
    enabled: !!slug,
  });

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  const formatContent = (content: string) => {
    return content
      .replace(/## (.*)/g, '<h2 class="text-2xl font-bold text-[#0B2C5F] mt-8 mb-4">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/- (.*)/g, '<li class="ml-4">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>');
  };

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-32 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-20 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Artikel Tidak Ditemukan
            </h1>
            <p className="text-gray-600 mb-8">
              Artikel yang Anda cari tidak tersedia atau telah dihapus.
            </p>
            <Link 
              to="/blog"
              className="inline-flex items-center text-[#22C55E] hover:text-[#22C55E]/80 font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <div className="mb-8">
          <Link 
            to="/blog"
            className="inline-flex items-center text-[#0B2C5F] hover:text-[#0B2C5F]/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Blog
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-[#0B2C5F] mb-4 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center text-gray-500 mb-6">
            <Calendar className="h-4 w-4 mr-2" />
            <time>{formatDate(post.created_at)}</time>
          </div>

          {post.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-[#22C55E] pl-6">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: `<p class="mb-4">${formatContent(post.content)}</p>`
            }}
          />
        </article>

        {/* Call to Action */}
        <div className="mt-12 p-8 bg-gray-50 rounded-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#0B2C5F] mb-4">
              Butuh Konsultasi CCTV?
            </h3>
            <p className="text-gray-600 mb-6">
              Tim ahli VisionGuard siap membantu Anda memilih dan memasang sistem CCTV yang tepat
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6285129336739?text=Halo%20VisionGuard%2C%20saya%20ingin%20konsultasi%20CCTV"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Konsultasi via WhatsApp
              </a>
              <Link
                to="/"
                className="bg-[#0B2C5F] hover:bg-[#0B2C5F]/90 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
