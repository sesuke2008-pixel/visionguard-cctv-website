import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import { getFAQs, createFAQ, updateFAQ, deleteFAQ } from '../../lib/faqs';
import type { FAQ } from '../../lib/supabase';

const FAQManager = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order_index: 0
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ['admin-faqs'],
    queryFn: getFAQs,
  });

  const createMutation = useMutation({
    mutationFn: createFAQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-faqs'] });
      resetForm();
      toast({ title: "Sukses", description: "FAQ berhasil dibuat" });
    },
    onError: (error) => {
      console.error('Error creating FAQ:', error);
      toast({ title: "Error", description: "Gagal membuat FAQ", variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<FAQ>) => updateFAQ(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-faqs'] });
      resetForm();
      toast({ title: "Sukses", description: "FAQ berhasil diupdate" });
    },
    onError: (error) => {
      console.error('Error updating FAQ:', error);
      toast({ title: "Error", description: "Gagal mengupdate FAQ", variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFAQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-faqs'] });
      toast({ title: "Sukses", description: "FAQ berhasil dihapus" });
    },
    onError: (error) => {
      console.error('Error deleting FAQ:', error);
      toast({ title: "Error", description: "Gagal menghapus FAQ", variant: "destructive" });
    }
  });

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      order_index: faqs.length
    });
    setIsCreating(false);
    setEditingFAQ(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order_index' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFAQ) {
      updateMutation.mutate({ id: editingFAQ.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const startEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      order_index: faq.order_index
    });
    setIsCreating(true);
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#0B2C5F]">FAQ Management</h1>
        <Button 
          onClick={() => {
            setFormData(prev => ({
              ...prev,
              order_index: faqs.length
            }));
            setIsCreating(true);
          }}
          className="bg-[#22C55E] hover:bg-[#22C55E]/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah FAQ
        </Button>
      </div>

      {isCreating && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingFAQ ? 'Edit FAQ' : 'Tambah FAQ Baru'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Pertanyaan</label>
              <Input
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Jawaban</label>
              <Textarea
                name="answer"
                value={formData.answer}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Urutan</label>
              <Input
                name="order_index"
                type="number"
                value={formData.order_index}
                onChange={handleInputChange}
                min="0"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Semakin kecil angka, semakin atas posisinya
              </p>
            </div>

            <div className="flex space-x-2">
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingFAQ ? 'Update' : 'Simpan'}
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
          <h2 className="text-xl font-semibold mb-4">Daftar FAQ</h2>
          
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border rounded p-4 animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : faqs.length > 0 ? (
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded text-sm font-medium text-gray-600 flex-shrink-0">
                        <GripVertical className="h-4 w-4" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="bg-[#0B2C5F] text-white px-2 py-1 rounded text-xs font-medium mr-3">
                            #{faq.order_index}
                          </span>
                          <h3 className="font-semibold text-lg">{faq.question}</h3>
                        </div>
                        <p className="text-gray-700 mb-2">{faq.answer}</p>
                        <p className="text-xs text-gray-400">
                          Dibuat: {formatDate(faq.created_at)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(faq)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteMutation.mutate(faq.id)}
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
            <p className="text-gray-500 text-center py-8">Belum ada FAQ yang dibuat</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQManager;
