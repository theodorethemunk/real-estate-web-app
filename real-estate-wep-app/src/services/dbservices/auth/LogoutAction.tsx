import { API_BASE_URL } from "../../../repo/datarepo";

export const logout = async (navigate: (path: string) => void) => {
    try {
      const response = await fetch(`${API_BASE_URL}/adminprofile/logout`, {
        method: "POST",
        //credentials: "include", // Ensures cookies (session) are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        navigate("/portalaccess"); // Redirect to login page after logout
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
