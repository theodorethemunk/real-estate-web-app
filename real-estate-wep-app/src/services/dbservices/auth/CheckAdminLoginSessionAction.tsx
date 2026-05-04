import { supabase } from '../../../supabaseClient'

export const checkSession = async (): Promise<boolean> => {
  const { data } = await supabase.auth.getSession()
  if (!data.session) return false
  const { data: adminData } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', data.session.user.id)
    .single()
  return !!adminData
}

export const CheckAdminLoginSessionAction = checkSession