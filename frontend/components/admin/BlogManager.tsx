import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import backend from '~backend/client';
import type { BlogPost, CreateBlogPostRequest, UpdateBlogPostRequest } from '~backend/cms/blog';

const BlogManager = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<CreateBlogPostRequest>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    published: false
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: blogData, isLoading } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: () => backend.cms.listAllBlogPosts(),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateBlogPostRequest) => backend.cms.createBlogPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      resetForm();
      toast({ title: "Sukses", description: "Post berhasil dibuat" });
    },
    onError: (error) => {
      console.error('Error creating post:', error);
      toast({ title: "Error", description: "Gagal membuat post", variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateBlogPostRequest) => backend.cms.updateBlogPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      resetForm();
      toast({ title: "Sukses", description: "Post berhasil diupdate" });
    },
    onError: (error) => {
      console.error('Error updating post:', error);
      toast({ title: "Error", description: "Gagal mengupdate post", variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => backend.cms.deleteBlogPost({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast({ title: "Sukses", description: "Post berhasil dihapus" });
    },
    onError: (error) => {
      console.error('Error deleting post:', error);
      toast({ title: "Error", description: "Gagal menghapus post", variant: "destructive" });
    }
  });

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      published: false
    });
    setIsCreating(false);
    setEditingPost(null);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      ...(name === 'title' && { slug: generateSlug(value) })
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      updateMutation.mutate({ ...formData, id: editingPost.id });
    } else {
      createMutation.mutate(formData);
    }
  };

  const startEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      published: post.published
    });
    setIsCreating(true);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#0B2C5F]">Blog Management</h1>
        <Button 
          onClick={() => setIsCreating(true)}
          className="bg-[#22C55E] hover:bg-[#22C55E]/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Post
        </Button>
      </div>

      {isCreating && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingPost ? 'Edit Post' : 'Tambah Post Baru'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Judul</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <Input
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Excerpt</label>
              <Textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <Textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={10}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleInputChange}
                className="rounded"
              />
              <label className="text-sm font-medium">Publish</label>
            </div>

            <div className="flex space-x-2">
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingPost ? 'Update' : 'Simpan'}
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
          <h2 className="text-xl font-semibold mb-4">Daftar Post</h2>
          
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border rounded p-4 animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : blogData?.posts && blogData.posts.length > 0 ? (
            <div className="space-y-4">
              {blogData.posts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg flex items-center">
                        {post.title}
                        {post.published ? (
                          <Eye className="ml-2 h-4 w-4 text-green-500" />
                        ) : (
                          <EyeOff className="ml-2 h-4 w-4 text-gray-400" />
                        )}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        /{post.slug}
                      </p>
                      {post.excerpt && (
                        <p className="text-gray-600 mt-2">{post.excerpt}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Dibuat: {formatDate(post.createdAt)}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(post)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteMutation.mutate(post.id)}
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
            <p className="text-gray-500 text-center py-8">Belum ada post yang dibuat</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogManager;
