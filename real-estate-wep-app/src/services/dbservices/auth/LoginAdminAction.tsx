import { AdminProfile } from "../../../models/interfaces/AdminProfile";
import { API_BASE_URL } from "../../../repo/datarepo";

export const loginAdminAction = async (
    email: string,
    password: string
  ): Promise<AdminProfile | null> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/adminprofile/login?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Invalid email or password");
      }
  
      const data: AdminProfile = await response.json();
      return data;
    } catch (error) {
      console.error("Login failed:", error);
      return null;
    }
  };
