import { supabase } from '../../../supabaseClient'
import Swal from 'sweetalert2'

export const SignUpAction = async (formData: any): Promise<any> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })
    if (error) return error.message
    Swal.fire({ icon: 'success', title: 'Welcome Onboard!', text: 'Your account has been created successfully' })
    return data.user
  } catch (error) {
    return 'Something went wrong'
  }
}

export const SignInAction = async (email: string, password: string): Promise<any> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return error.message
    if (!data.user) return 'Incorrect email or password.'
    return {
      id: data.user.id,
      email: data.user.email,
      sign_in_id: data.session?.access_token ?? ''
    }
  } catch (error) {
    return 'Something went wrong'
  }
}

export const SignOutAction = async () => {
  await supabase.auth.signOut()
  localStorage.removeItem('user')
}

export const ResetPasswordAction = async (email: string, password?: string): Promise<string> => {
  try {
    if (password) {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) return error.message
      Swal.fire({ icon: 'success', title: 'Password Reset!', text: 'Your password has been updated' })
      return 'success'
    }
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

export const ForgotPasswordAction = ResetPasswordAction

export const GetSignUpVerificationCodeAction = async (email: string): Promise<string> => {
  try {
    const { error } = await supabase.auth.resend({ type: 'signup', email })
    if (error) return error.message
    Swal.fire({ icon: 'success', title: 'Code Sent!', text: 'Check your email for the verification code' })
    return 'success'
  } catch (error) {
    return 'Something went wrong'
  }
}

export const VerifyEmailAction = async (email: string, token?: string): Promise<string> => {
  try {
    if (token) {
      const { error } = await supabase.auth.verifyOtp({ email, token, type: 'signup' })
      if (error) return error.message
    }
    Swal.fire({ icon: 'success', title: 'Email Verified!', text: 'Your email has been verified' })
    return 'success'
  } catch (error) {
    return 'Something went wrong'
  }
}