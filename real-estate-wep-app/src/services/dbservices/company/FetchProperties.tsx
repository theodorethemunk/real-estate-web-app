import { API_BASE_URL } from "../../../repo/datarepo";
import { IPropertyMain } from "../../../models/interfaces/PropertyInterface";

const API_URL = `${API_BASE_URL}/EstateProperty/fetch-estate-properties-lite`;

export const fetchPropertiesLite = async (limit: number, keyword: string = ""): Promise<IPropertyMain[]> => {
  try {
    const url = new URL(API_URL);
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
    console.error("Error fetching Properties:", error);
    return [];
  }
};
