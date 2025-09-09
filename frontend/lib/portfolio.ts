import { supabase, type PortfolioProject } from './supabase'

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .order('completion_date', { ascending: false })

  if (error) throw error
  return data || []
}

export async function createPortfolioProject(project: Omit<PortfolioProject, 'id' | 'created_at'>): Promise<PortfolioProject> {
  const { data, error } = await supabase
    .from('portfolio_projects')
    .insert([project])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updatePortfolioProject(id: number, project: Partial<PortfolioProject>): Promise<PortfolioProject> {
  const { data, error } = await supabase
    .from('portfolio_projects')
    .update(project)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deletePortfolioProject(id: number): Promise<void> {
  const { error } = await supabase
    .from('portfolio_projects')
    .delete()
    .eq('id', id)

  if (error) throw error
}
