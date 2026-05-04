import { supabase } from '../../../supabaseClient'
import Swal from 'sweetalert2'

export const SignUpAction = async (formData: any): Promise<string> => {
  try {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })
    if (error) return error.message
    Swal.fire({ icon: 'success', title: 'Welcome Onboard!', text: 'Your account has been created successfully' })
    return 'success'
  } catch (error) {
    return 'Something went wrong'
  }
}

export const SignInAction = async (formData: any): Promise<string> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })
    if (error) return error.message
    const isAdmin = data.user?.email === 'Sannioladimeji2003@gmail.com'
    localStorage.setItem('user', JSON.stringify({ ...data.user, isAdmin }))
    return 'success'
  } catch (error) {
    return 'Something went wrong'
  }
}

export const SignOutAction = async () => {
  await supabase.auth.signOut()
  localStorage.removeItem('user')
}
export const ResetPasswordAction = async (email: string): Promise<string> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/resetpassword'
    })
    if (error) return error.message
    Swal.fire({ icon: 'success', title: 'Email Sent!', text: 'Check your email for the reset link' })
    return 'success'
  } catch (error) {
    return 'Something went wrong'
  }
}
export const ForgotPasswordAction = async (email: string): Promise<string> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/resetpassword'
    })
    if (error) return error.message
    Swal.fire({ icon: 'success', title: 'Email Sent!', text: 'Check your email for the password reset link' })
    return 'success'
  } catch (error) {
    return 'Something went wrong'
  }
}
export const GetSignUpVerificationCodeAction = async (email: string): Promise<string> => {
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email
    })
    if (error) return error.message
    Swal.fire({ icon: 'success', title: 'Code Sent!', text: 'Check your email for the verification code' })
    return 'success'
  } catch (error) {
    return 'Something went wrong'
  }
}

export const VerifyEmailAction = async (token: string, email: string): Promise<string> => {
  try {
    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: token,
      type: 'signup'
    })
    if (error) return error.message
    Swal.fire({ icon: 'success', title: 'Email Verified!', text: 'Your email has been verified successfully' })
    return 'success'
  } catch (error) {
    return 'Something went wrong'
  }
}