import { supabase } from '../../../supabaseClient'

export const FetchCompanyInfo = async () => {
  try {
    const { data, error } = await supabase
      .from('company_settings')
      .select('*')
      .single()
    if (error) return null
    return data
  } catch (error) {
    return null
  }
}