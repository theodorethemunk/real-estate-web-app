import { supabase } from '../../../supabaseClient'

export const CheckAdminLoginSessionAction = async (): Promise<boolean> => {
  const { data } = await supabase.auth.getSession()
  if (!data.session) return false
  const user = data.session.user
  const { data: adminData } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', user.id)
    .single()
  return !!adminData
}