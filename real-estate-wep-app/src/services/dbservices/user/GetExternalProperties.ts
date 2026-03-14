 import { API_BASE_URL } from "../../../repo/datarepo";
import { IExternalProp } from "../../../models/interfaces/IExternalProp";

export const getExternalPropertiesAction = async (propertyId: number): Promise<IExternalProp[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/externalproperties/get-nearest-properties?propertyId=${propertyId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch landmark properties");
    }

    const data = await response.json(); // read once
    console.log("✅ Property Nearest Landmarks Fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching landmark properties:", error);
    return [];
  }
};

