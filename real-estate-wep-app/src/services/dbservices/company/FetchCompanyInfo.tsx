import { supabase } from '../../../supabaseClient'

export interface Setting {
  id?: string
  name?: string
  email?: string
  phone?: string
  address?: string
  logoFilePath?: string
  bannerFilePath?: string
  facebookUrl?: string
  twitterUrl?: string
  instagramUrl?: string
  linkedinUrl?: string
  youtubeUrl?: string
  aboutUs?: string
  vision?: string
  mission?: string
}

export const fetchCompanyInfo = async (): Promise<Setting | null> => {
  try {
    const { data, error } = await supabase
      .from('company_settings')
      .select('*')
      .single()
    if (error) return null
    return data as Setting
  } catch (error) {
    return null
  }
}

export const FetchCompanyInfo = fetchCompanyInfo