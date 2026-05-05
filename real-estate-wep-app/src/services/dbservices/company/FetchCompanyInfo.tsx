import { supabase } from '../../../supabaseClient'

export interface Setting {
  id: string
  name: string
  email: string
  phone: string
  address: string
  context: string
  logo_file_path: string
  banner_file_path: string
  facebook_url: string
  twitter_url: string
  instagram_url: string
  linkedin_url: string
  youtube_url: string
  about_us: string
  vision: string
  mission: string
  [key: string]: any
}

const defaultSetting: Setting = {
  id: '',
  name: 'Sommy Properties Ltd',
  email: 'info@sommyproperties.com',
  phone: '+234 000 0000',
  address: 'Lagos, Nigeria',
  context: '',
  logo_file_path: '',
  banner_file_path: '',
  facebook_url: '',
  twitter_url: '',
  instagram_url: '',
  linkedin_url: '',
  youtube_url: '',
  about_us: '',
  vision: '',
  mission: '',
}

export const fetchCompanyInfo = async (): Promise<Setting> => {
  try {
    const { data, error } = await supabase
      .from('company_settings')
      .select('*')
      .single()
    if (error || !data) return defaultSetting
    return { ...defaultSetting, ...data } as Setting
  } catch (error) {
    return defaultSetting
  }
}

export const FetchCompanyInfo = fetchCompanyInfo