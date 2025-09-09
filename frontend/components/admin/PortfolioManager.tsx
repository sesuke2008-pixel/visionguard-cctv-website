import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, Building } from 'lucide-react';
import { getPortfolioProjects, createPortfolioProject, updatePortfolioProject, deletePortfolioProject } from '../../lib/portfolio';
import type { PortfolioProject } from '../../lib/supabase';

const PortfolioManager = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    project_type: '',
    client_name: '',
    completion_date: '',
    camera_count: 0
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['admin-portfolio'],
    queryFn: getPortfolioProjects,
  });

  const createMutation = useMutation({
    mutationFn: createPortfolioProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-portfolio'] });
      resetForm();
      toast({ title: "Sukses", description: "Proyek berhasil dibuat" });
    },
    onError: (error) => {
      console.error('Error creating project:', error);
      toast({ title: "Error", description: "Gagal membuat proyek", variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<PortfolioProject>) => updatePortfolioProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-portfolio'] });
      resetForm();
      toast({ title: "Sukses", description: "Proyek berhasil diupdate" });
    },
    onError: (error) => {
      console.error('Error updating project:', error);
      toast({ title: "Error", description: "Gagal mengupdate proyek", variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deletePortfolioProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-portfolio'] });
      toast({ title: "Sukses", description: "Proyek berhasil dihapus" });
    },
    onError: (error) => {
      console.error('Error deleting project:', error);
      toast({ title: "Error", description: "Gagal menghapus proyek", variant: "destructive" });
    }
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      project_type: '',
      client_name: '',
      completion_date: '',
      camera_count: 0
    });
    setIsCreating(false);
    setEditingProject(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'camera_count' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      camera_count: formData.camera_count || undefined,
      completion_date: formData.completion_date || undefined
    };
    
    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, ...submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const startEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description || '',
      image_url: project.image_url || '',
      project_type: project.project_type,
      client_name: project.client_name || '',
      completion_date: project.completion_date || '',
      camera_count: project.camera_count || 0
    });
    setIsCreating(true);
  };

  const formatDate = (date: string | null | undefined) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#0B2C5F]">Portfolio Management</h1>
        <Button 
          onClick={() => setIsCreating(true)}
          className="bg-[#22C55E] hover:bg-[#22C55E]/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Proyek
        </Button>
      </div>

      {isCreating && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingProject ? 'Edit Proyek' : 'Tambah Proyek Baru'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Judul Proyek</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Deskripsi</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tipe Proyek</label>
              <select
                name="project_type"
                value={formData.project_type}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Pilih Tipe</option>
                <option value="Residensial">Residensial</option>
                <option value="Retail">Retail</option>
                <option value="Perkantoran">Perkantoran</option>
                <option value="Industri">Industri</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Perumahan">Perumahan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nama Klien</label>
              <Input
                name="client_name"
                value={formData.client_name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Jumlah Kamera</label>
              <Input
                name="camera_count"
                type="number"
                value={formData.camera_count}
                onChange={handleInputChange}
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tanggal Selesai</label>
              <Input
                name="completion_date"
                type="date"
                value={formData.completion_date}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">URL Gambar (Opsional)</label>
              <Input
                name="image_url"
                type="url"
                value={formData.image_url}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex space-x-2">
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingProject ? 'Update' : 'Simpan'}
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
          <h2 className="text-xl font-semibold mb-4">Daftar Proyek</h2>
          
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border rounded p-4 animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-[#0B2C5F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building className="h-6 w-6 text-[#0B2C5F]" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{project.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span className="bg-[#22C55E]/10 text-[#22C55E] px-2 py-1 rounded-full text-xs">
                            {project.project_type}
                          </span>
                          {project.camera_count && (
                            <span>{project.camera_count} kamera</span>
                          )}
                          {project.completion_date && (
                            <span>{formatDate(project.completion_date)}</span>
                          )}
                        </div>
                        {project.client_name && (
                          <p className="text-sm text-gray-600 mt-1">
                            Klien: {project.client_name}
                          </p>
                        )}
                        {project.description && (
                          <p className="text-gray-700 mt-2">{project.description}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(project)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteMutation.mutate(project.id)}
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
            <p className="text-gray-500 text-center py-8">Belum ada proyek yang dibuat</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioManager;
