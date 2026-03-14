import { IPropertyFeature } from "../../../models/interfaces/IPropertyFeature";
import { API_BASE_URL } from "../../../repo/datarepo";

export const getPropertyFeaturesAction  = async (property_id: number): Promise<IPropertyFeature[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/estatepropertyprops/get-all-props-by-property-id?propertyId=${property_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch property features");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching property features:", error);
      return [];
    }
  };
  
