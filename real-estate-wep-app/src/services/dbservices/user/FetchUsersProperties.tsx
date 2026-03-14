import { API_BASE_URL } from "../../../repo/datarepo";
import { IProperty } from "../../../models/interfaces/PropertyInterface";

export const fetchUsersProperties = async (userId: string | null): Promise<IProperty[]> => {
  if (!userId || userId === "0") {
    console.error("Invalid userId for property fetch.");
    return [];
  }

  console.log("Properties fetch User Id: " + userId);
  
  try {
    // ✅ Fix: Use query parameters instead of route parameters
    const response = await fetch(`${API_BASE_URL}/estateproperty/fetch-estate-properties-by-owner-id?owner_id=${userId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user properties. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user properties:", error);
    return [];
  }
};
