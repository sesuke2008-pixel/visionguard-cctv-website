import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Shield } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password check - dalam production, gunakan sistem auth yang proper
    if (password === 'visionguard2024') {
      localStorage.setItem('admin-logged-in', 'true');
      onLogin();
      toast({ title: "Sukses", description: "Login berhasil" });
    } else {
      toast({ title: "Error", description: "Password salah", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Shield className="h-12 w-12 text-[#0B2C5F] mx-auto" />
          <h2 className="mt-6 text-3xl font-bold text-[#0B2C5F]">
            VisionGuard Admin
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Masukkan password untuk mengakses admin panel
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password admin"
              required
              className="w-full"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-[#0B2C5F] hover:bg-[#0B2C5F]/90"
          >
            Login
          </Button>
        </form>

        <div className="text-center">
          <a
            href="/"
            className="text-sm text-[#22C55E] hover:text-[#22C55E]/80"
          >
            ← Kembali ke Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
