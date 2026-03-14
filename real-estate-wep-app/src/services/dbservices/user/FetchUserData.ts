import { IUserProfile } from "../../../models/interfaces/IUserProfile";
import { API_BASE_URL } from "../../../repo/datarepo";

export const GetUserInfoAction = async (email: string, loginId: string): Promise<IUserProfile | null> => {
  console.log("Fetching user profile email:", email);
  console.log("Fetching user profile loginId:", loginId);

  try {
    const response = await fetch(`${API_BASE_URL}/userprofile/login-lite?email=${email}&loginId=${loginId}`, { // ✅ Removed $
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage); // Throw an Error object
    }

    const userProfile: IUserProfile = await response.json();
    console.log("User Profile Data:", userProfile); // ✅ Log response
    return userProfile;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Fetching user profile failed:", error.message);
    } else {
      console.error("An unknown error occurred while fetching user profile:", error);
    }
    return null; // Return null on failure
  }
};
