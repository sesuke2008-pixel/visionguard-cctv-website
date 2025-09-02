import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, Building } from 'lucide-react';
import backend from '~backend/client';
import type { PortfolioProject, CreatePortfolioRequest, UpdatePortfolioRequest } from '~backend/cms/portfolio';

const PortfolioManager = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [formData, setFormData] = useState<CreatePortfolioRequest>({
    title: '',
    description: '',
    imageUrl: '',
    projectType: '',
    clientName: '',
    completionDate: undefined,
    cameraCount: undefined
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: portfolioData, isLoading } = useQuery({
    queryKey: ['admin-portfolio'],
    queryFn: () => backend.cms.listPortfolioProjects(),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreatePortfolioRequest) => backend.cms.createPortfolioProject(data),
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
    mutationFn: (data: UpdatePortfolioRequest) => backend.cms.updatePortfolioProject(data),
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
    mutationFn: (id: number) => backend.cms.deletePortfolioProject({ id }),
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
      imageUrl: '',
      projectType: '',
      clientName: '',
      completionDate: undefined,
      cameraCount: undefined
    });
    setIsCreating(false);
    setEditingProject(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let processedValue: any = value;
    
    if (name === 'cameraCount') {
      processedValue = value === '' ? undefined : parseInt(value);
    } else if (name === 'completionDate') {
      processedValue = value === '' ? undefined : new Date(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      updateMutation.mutate({ ...formData, id: editingProject.id });
    } else {
      createMutation.mutate(formData);
    }
  };

  const startEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description || '',
      imageUrl: project.imageUrl || '',
      projectType: project.projectType,
      clientName: project.clientName || '',
      completionDate: project.completionDate || undefined,
      cameraCount: project.cameraCount || undefined
    });
    setIsCreating(true);
  };

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  const formatDateForInput = (date: Date | null | undefined) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
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
                name="projectType"
                value={formData.projectType}
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
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Jumlah Kamera</label>
              <Input
                name="cameraCount"
                type="number"
                value={formData.cameraCount || ''}
                onChange={handleInputChange}
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tanggal Selesai</label>
              <Input
                name="completionDate"
                type="date"
                value={formatDateForInput(formData.completionDate)}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">URL Gambar (Opsional)</label>
              <Input
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
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
          ) : portfolioData?.projects && portfolioData.projects.length > 0 ? (
            <div className="space-y-4">
              {portfolioData.projects.map((project) => (
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
                            {project.projectType}
                          </span>
                          {project.cameraCount && (
                            <span>{project.cameraCount} kamera</span>
                          )}
                          {project.completionDate && (
                            <span>{formatDate(project.completionDate)}</span>
                          )}
                        </div>
                        {project.clientName && (
                          <p className="text-sm text-gray-600 mt-1">
                            Klien: {project.clientName}
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
