import { API_BASE_URL } from "../../../../repo/datarepo";
import { ITestimonial } from "../../../../models/interfaces/ITestimonial";

export const fetchTestimonialByAdmin = async (keyword: string = "", limit: number = 500): Promise<ITestimonial[]> => {
    try {
      const url = new URL(`${API_BASE_URL}/testimonial/fetch-all-testimonials`);
      url.searchParams.append("limit", limit.toString());
      if (keyword.trim()) {
        url.searchParams.append("keyword", keyword);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return [];
    }
};
