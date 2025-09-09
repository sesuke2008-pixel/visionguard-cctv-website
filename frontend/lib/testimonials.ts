import { supabase, type Testimonial } from './supabase'

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at'>): Promise<Testimonial> {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonial])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateTestimonial(id: number, testimonial: Partial<Testimonial>): Promise<Testimonial> {
  const { data, error } = await supabase
    .from('testimonials')
    .update(testimonial)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteTestimonial(id: number): Promise<void> {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id)

  if (error) throw error
}
