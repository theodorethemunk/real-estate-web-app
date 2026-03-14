import { API_BASE_URL } from "../../../../repo/datarepo";
import { IPropertyMain } from "../../../../models/interfaces/PropertyInterface";

export const fetchPropertiesByAdmin = async (keyword: string = "", limit: number = 500): Promise<IPropertyMain[]> => {
    try {
      const url = new URL(`${API_BASE_URL}/estateproperty/fetch-estate-properties-by-admin`);
      url.searchParams.append("limit", limit.toString());
      if (keyword.trim()) {
        url.searchParams.append("keyword", keyword);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching properties:", error);
      return [];
    }
};
