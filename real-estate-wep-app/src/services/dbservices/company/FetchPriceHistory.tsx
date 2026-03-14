import { API_BASE_URL } from "../../../repo/datarepo";
import { IPriceHistory } from "../../../models/interfaces/PriceHistoryInterface";

const API_URL = `${API_BASE_URL}/pricehistory/get-unique-price-histories`;

export const fetchPriceHistory = async (): Promise<IPriceHistory[]> => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch price history");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching price history:", error);
      return [];
    }
  };
