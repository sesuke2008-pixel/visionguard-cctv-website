import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import backend from '~backend/client';
import type { Testimonial, CreateTestimonialRequest, UpdateTestimonialRequest } from '~backend/cms/testimonials';

const TestimonialManager = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<CreateTestimonialRequest>({
    name: '',
    company: '',
    content: '',
    rating: 5
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: testimonialsData, isLoading } = useQuery({
    queryKey: ['admin-testimonials'],
    queryFn: () => backend.cms.listTestimonials(),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateTestimonialRequest) => backend.cms.createTestimonial(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      resetForm();
      toast({ title: "Sukses", description: "Testimoni berhasil dibuat" });
    },
    onError: (error) => {
      console.error('Error creating testimonial:', error);
      toast({ title: "Error", description: "Gagal membuat testimoni", variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateTestimonialRequest) => backend.cms.updateTestimonial(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      resetForm();
      toast({ title: "Sukses", description: "Testimoni berhasil diupdate" });
    },
    onError: (error) => {
      console.error('Error updating testimonial:', error);
      toast({ title: "Error", description: "Gagal mengupdate testimoni", variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => backend.cms.deleteTestimonial({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      toast({ title: "Sukses", description: "Testimoni berhasil dihapus" });
    },
    onError: (error) => {
      console.error('Error deleting testimonial:', error);
      toast({ title: "Error", description: "Gagal menghapus testimoni", variant: "destructive" });
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      content: '',
      rating: 5
    });
    setIsCreating(false);
    setEditingTestimonial(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestimonial) {
      updateMutation.mutate({ ...formData, id: editingTestimonial.id });
    } else {
      createMutation.mutate(formData);
    }
  };

  const startEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      company: testimonial.company || '',
      content: testimonial.content,
      rating: testimonial.rating
    });
    setIsCreating(true);
  };

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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#0B2C5F]">Testimonial Management</h1>
        <Button 
          onClick={() => setIsCreating(true)}
          className="bg-[#22C55E] hover:bg-[#22C55E]/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Testimoni
        </Button>
      </div>

      {isCreating && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingTestimonial ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nama</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Perusahaan (Opsional)</label>
              <Input
                name="company"
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num} Bintang</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Testimoni</label>
              <Textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>

            <div className="flex space-x-2">
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingTestimonial ? 'Update' : 'Simpan'}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Batal
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Daftar Testimoni</h2>
          
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border rounded p-4 animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : testimonialsData?.testimonials && testimonialsData.testimonials.length > 0 ? (
            <div className="space-y-4">
              {testimonialsData.testimonials.map((testimonial) => (
                <div key={testimonial.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="font-semibold text-lg mr-3">{testimonial.name}</h3>
                        <div className="flex">{renderStars(testimonial.rating)}</div>
                      </div>
                      {testimonial.company && (
                        <p className="text-sm text-gray-600 mb-2">{testimonial.company}</p>
                      )}
                      <p className="text-gray-700 mb-2">"{testimonial.content}"</p>
                      <p className="text-xs text-gray-400">
                        Dibuat: {formatDate(testimonial.createdAt)}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(testimonial)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteMutation.mutate(testimonial.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Belum ada testimoni yang dibuat</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialManager;
