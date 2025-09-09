import { supabase, type FAQ } from './supabase'

export async function getFAQs(): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) throw error
  return data || []
}

export async function createFAQ(faq: Omit<FAQ, 'id' | 'created_at'>): Promise<FAQ> {
  const { data, error } = await supabase
    .from('faqs')
    .insert([faq])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateFAQ(id: number, faq: Partial<FAQ>): Promise<FAQ> {
  const { data, error } = await supabase
    .from('faqs')
    .update(faq)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteFAQ(id: number): Promise<void> {
  const { error } = await supabase
    .from('faqs')
    .delete()
    .eq('id', id)

  if (error) throw error
}
