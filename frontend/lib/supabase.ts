import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project-url.supabase.co'
const supabaseKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type BlogPost = {
  id: number
  title: string
  slug: string
  excerpt?: string
  content: string
  published: boolean
  created_at: string
  updated_at: string
}

export type Testimonial = {
  id: number
  name: string
  company?: string
  content: string
  rating: number
  created_at: string
}

export type PortfolioProject = {
  id: number
  title: string
  description?: string
  image_url?: string
  project_type: string
  client_name?: string
  completion_date?: string
  camera_count?: number
  created_at: string
}

export type FAQ = {
  id: number
  question: string
  answer: string
  order_index: number
  created_at: string
}

export type ContactSubmission = {
  id: number
  name: string
  whatsapp: string
  needs: string
  email?: string
  created_at: string
}
