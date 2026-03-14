import { API_BASE_URL } from "../../../repo/datarepo";

export const checkSession = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/adminprofile/check-session`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    console.log("Session Response Check:", data); 
    return data.success;
  } catch {
    return false;
  }
};
