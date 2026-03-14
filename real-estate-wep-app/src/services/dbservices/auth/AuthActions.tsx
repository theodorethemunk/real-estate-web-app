import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../repo/datarepo";
import { AuthInterface } from "../../../models/interfaces/AuthInterface";
import { generateCode } from "../../Util/NumberGenerator";
import { IUserProfile } from "../../../models/interfaces/IUserProfile";


export const SignUpAction = async (formData: AuthInterface): Promise<string> => {
  console.log("Signing Up: ", JSON.stringify(formData));

  try {
    const response = await fetch(`${API_BASE_URL}/userprofile/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const result = await response.text();
    if (!response.ok)
    {
      //throw new Error(result);
      return result;
    };

    Swal.fire({
      icon: "success",
      title: "Welcome Onboard!",
      text: "Your account has been created successfully",
    });

    return "success";
  } catch (error) {
    console.log("Error: " + error);
    return "Failed to create your acccount: " + error;
  }
};

export const GetSignUpVerificationCodeAction = async (email: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/userprofile/check-v-code?email=${encodeURIComponent(email)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return "";
    }

    const vCode = await response.text();
    return vCode;

  } catch (error) {
    console.error("Error fetching verification code:", error);
    return "";
  }
};


export const VerifyEmailAction = async (email: string) => {
  try {
    await fetch(`${API_BASE_URL}/userprofile/approve-user-email?email=${encodeURIComponent(email)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    Swal.fire({
      icon: "success",
      title: "Email Verified!",
      text: "Your email has been successfully verified.",
    });

  } catch (error) {
    console.error("Error verifying email:", error);
  }
};

export const ForgotPasswordAction = async (email: string) => {

  const vCode = generateCode();

  try {
    await fetch(`${API_BASE_URL}/userprofile/forgot-password?email=${encodeURIComponent(email)}&vcode=${encodeURIComponent(vCode)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error verifying email:", error);
  }
};

export const ResetPasswordAction = async (email: string, password: string, accessToken: string) => {

  const vCode = generateCode();

  try {
    await fetch(`${API_BASE_URL}/userprofile/reset-password?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&vcode=${encodeURIComponent(vCode)}&access_token=${encodeURIComponent(accessToken)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error updating password:", error);
  }
};

export const SignInAction = async (email: string, password: string): Promise<IUserProfile | null> => {

  try {
    const response = await fetch(`${API_BASE_URL}/userprofile/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage); // Throw an Error object
    }

    const userProfile: IUserProfile = await response.json();
    return userProfile;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Login failed:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
    return null; // Return null on failure
  }
};

export const ChangePasswordAction = async (email: string, password: string): Promise<string> => {

  try {
    const response = await fetch(`${API_BASE_URL}/userprofile/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.text();
    if (!response.ok) throw new Error(result);

    return "success";
  } catch (error) {
    return "Failed to resend verification code";
  }
};
