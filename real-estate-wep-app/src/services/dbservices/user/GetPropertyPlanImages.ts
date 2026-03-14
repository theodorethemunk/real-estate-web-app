import { API_BASE_URL } from "../../../repo/datarepo";
import { IPlanImage } from "../../../models/interfaces/IPlanImage";

export const getPropertyPlanImagesAction = async (property_id: number): Promise<IPlanImage[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/planimage/fetch-images?property_id=${property_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  };
