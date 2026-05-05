import { supabase } from '../../../supabaseClient'
import { IUserProfile } from "../../../models/interfaces/IUserProfile";

export const GetUserInfoAction = async (_email: string, loginId: string): Promise<IUserProfile | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    // Return user data from Supabase auth
    const userProfile: IUserProfile = {
      id: user.id as any,
      email: user.email ?? '',
      first_name: user.user_metadata?.first_name ?? '',
      middle_name: user.user_metadata?.middle_name ?? '',
      last_name: user.user_metadata?.last_name ?? '',
      phone: user.user_metadata?.phone ?? '',
      dob: user.user_metadata?.dob ?? '',
      address: user.user_metadata?.address ?? '',
      imageFilePath: user.user_metadata?.imageFilePath ?? '',
      temp_pin: '',
      sign_in_id: loginId,
    } as any
    
    return userProfile
  } catch (error) {
    console.error("Fetching user profile failed:", error)
    return null
  }
}