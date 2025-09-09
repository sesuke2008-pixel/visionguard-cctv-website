import { supabase, type ContactSubmission } from './supabase'

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function createContactSubmission(contact: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<ContactSubmission> {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([contact])
    .select()
    .single()

  if (error) throw error
  return data
}
