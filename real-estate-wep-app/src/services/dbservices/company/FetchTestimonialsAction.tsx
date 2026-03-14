import { API_BASE_URL } from "../../../repo/datarepo";
import { ITestimonial } from "../../../models/interfaces/ITestimonial";

const API_URL = `${API_BASE_URL}/testimonial/fetch-testimonials`;

export const fetchTestimonialsAction = async (): Promise<ITestimonial[]> => {
    try {
      const response = await fetch(API_URL);

      console.log("Testimonials", response);

      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return [];
    }
  };
