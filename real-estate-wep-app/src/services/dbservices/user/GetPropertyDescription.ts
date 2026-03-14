import { IPropertyMain } from "../../../models/interfaces/PropertyInterface";
import { API_BASE_URL } from "../../../repo/datarepo";

export const getPropertyDescriptionAction = async (property_id: number): Promise<IPropertyMain | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/estateproperty/fetch-estate-property-info?property_id=${property_id}`);
      if (!response.ok) throw new Error("Failed to fetch property info");
  
      const property: IPropertyMain = await response.json(); // Assuming API returns a single object, not an array
      console.log("✅ Property Info Fetched:", property);
      return property;
    } catch (error) {
      console.error("Error fetching property info:", error);
      return null;
    }
  };
  
