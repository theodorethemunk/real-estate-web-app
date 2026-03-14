import { API_BASE_URL } from "../../../repo/datarepo";
import { IFaq } from "../../../models/interfaces/FAQInterface";

const API_URL = `${API_BASE_URL}/faq/fetch-faqs`;

export const fetchFAQs = async (): Promise<IFaq[]> => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch FAQs");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      return [];
    }
  };
