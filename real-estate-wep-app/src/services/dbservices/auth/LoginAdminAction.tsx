import { AdminProfile } from "../../../models/interfaces/AdminProfile";
import { supabase } from '../../../supabaseClient'

export const loginAdminAction = async (
  email: string,
  password: string
): Promise<AdminProfile | null> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error || !data.user) return null

    // Check if user is in admin_users table
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (adminError || !adminData) return null

    const adminProfile: AdminProfile = {
      id: data.user.id as any,
      email: data.user.email ?? '',
      phone: adminData.phone ?? '',
      first_name: adminData.first_name ?? '',
      last_name: adminData.last_name ?? '',
    } as any

    return adminProfile
  } catch (error) {
    console.error("Login failed:", error)
    return null
  }
}