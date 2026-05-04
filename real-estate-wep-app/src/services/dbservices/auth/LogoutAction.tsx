import { supabase } from '../../../supabaseClient'

export const LogoutAction = async () => {
  await supabase.auth.signOut()
  localStorage.removeItem('user')
  window.location.href = '/signin'
}