import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, FileText, Star, Briefcase, HelpCircle, MessageSquare, Menu, X, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import BlogManager from '../components/admin/BlogManager';
import TestimonialManager from '../components/admin/TestimonialManager';
import PortfolioManager from '../components/admin/PortfolioManager';
import FAQManager from '../components/admin/FAQManager';
import ContactManager from '../components/admin/ContactManager';
import AdminLogin from './AdminLogin';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const loggedIn = localStorage.getItem('admin-logged-in') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-logged-in');
    setIsLoggedIn(false);
    toast({ title: "Logout", description: "Anda telah logout dari admin panel" });
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const navigation = [
    { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
    { name: 'Testimonials', href: '/admin/testimonials', icon: Star },
    { name: 'Portfolio', href: '/admin/portfolio', icon: Briefcase },
    { name: 'FAQ', href: '/admin/faq', icon: HelpCircle },
    { name: 'Contact Submissions', href: '/admin/contact', icon: MessageSquare },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="flex">
        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-20 left-4 z-40">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-white p-2 rounded-lg shadow-md border"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            {/* Logo */}
            <div className="flex items-center px-6 py-4 border-b border-gray-200">
              <Shield className="h-8 w-8 text-[#0B2C5F]" />
              <span className="ml-2 text-xl font-bold text-[#0B2C5F]">VisionGuard</span>
              <span className="ml-2 text-sm text-gray-500">Admin</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-[#0B2C5F] text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="px-4 py-4 border-t border-gray-200 space-y-2">
              <Link
                to="/"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ← Kembali ke Website
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          <div className="p-6 lg:p-8">
            <Routes>
              <Route path="/blog" element={<BlogManager />} />
              <Route path="/testimonials" element={<TestimonialManager />} />
              <Route path="/portfolio" element={<PortfolioManager />} />
              <Route path="/faq" element={<FAQManager />} />
              <Route path="/contact" element={<ContactManager />} />
              <Route path="/" element={
                <div className="text-center py-12">
                  <Shield className="h-16 w-16 text-[#0B2C5F] mx-auto mb-4" />
                  <h1 className="text-3xl font-bold text-[#0B2C5F] mb-4">
                    VisionGuard Admin Dashboard
                  </h1>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Kelola konten website Anda dengan mudah menggunakan panel admin ini.
                    Pilih menu di sidebar untuk mulai mengedit.
                  </p>
                </div>
              } />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
