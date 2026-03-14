import { API_BASE_URL } from "../../../repo/datarepo";
import { IFaq } from "../../../models/interfaces/FAQInterface";

const API_URL = `${API_BASE_URL}/faq/fetch-faqs`;

const fetchFAQ = async (category: string = ""): Promise<IFaq[]> => {
    try {
      const url = new URL(API_URL);
      url.searchParams.append("category", category);

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
};

export {fetchFAQ};
