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
  context?: string
  [key: string]: any
}

export const fetchCompanyInfo = async (): Promise<Setting> => {
  try {
    const { data, error } = await supabase
      .from('company_settings')
      .select('*')
      .single()
    if (error || !data) return {} as Setting
    return data as Setting
  } catch (error) {
    return {} as Setting
  }
}

export const FetchCompanyInfo = fetchCompanyInfo