import { supabase, type BlogPost } from './supabase'

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) return null
  return data
}

export async function createPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([{ ...post, updated_at: new Date().toISOString() }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updatePost(id: number, post: Partial<BlogPost>): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({ ...post, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deletePost(id: number): Promise<void> {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) throw error
}
