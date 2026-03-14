import { API_BASE_URL } from "../../../repo/datarepo";
import { IPriceHistory } from "../../../models/interfaces/PriceHistoryInterface";

export const getPropertyPriceHistoryAction = async (property_id: number): Promise<IPriceHistory[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/pricehistory/get-top-30-by-property/${property_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch price history");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching price history:", error);
      return [];
    }
  };
