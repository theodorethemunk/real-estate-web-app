import { API_BASE_URL } from "../../../../repo/datarepo";
import { IFaq } from "../../../../models/interfaces/FAQInterface";

export const fetchFAQByAdmin = async (keyword: string = "", limit: number = 500): Promise<IFaq[]> => {
    try {
      const url = new URL(`${API_BASE_URL}/faq/fetch-all-faqs`);
      url.searchParams.append("limit", limit.toString());
      if (keyword.trim()) {
        url.searchParams.append("keyword", keyword);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch faqs");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching faqs:", error);
      return [];
    }
};
