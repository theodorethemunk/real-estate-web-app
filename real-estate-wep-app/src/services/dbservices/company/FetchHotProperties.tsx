import { API_BASE_URL } from "../../../repo/datarepo";
import { IPropertyMain } from "../../../models/interfaces/PropertyInterface";

export const fetchHotPropertiesAction = async (limit: number): Promise<IPropertyMain[]> => {
  if (!limit || limit < 1) {
    console.error("Invalid lmit for property fetch.", limit);
    return [];
  }
  
  try {
    // ✅ Fix: Use query parameters instead of route parameters
    const response = await fetch(`${API_BASE_URL}/estateproperty/fetch-hot-estate-properties?limit=${limit}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch hot estate properties. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching hot estate properties:", error);
    return [];
  }
};
